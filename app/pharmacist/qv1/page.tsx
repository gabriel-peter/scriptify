"use server"
import { Divider } from "@/components/catalyst-ui/divider";
import { Heading } from "@/components/catalyst-ui/heading";
import { BasicList_Server } from "@/components/lists/basic-list-server";
import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import DebugButton from "./DebugButton";
import { Text } from "@/components/catalyst-ui/text";
import CustomTable from "@/components/tables/standard-table";
import Paginator from "@/components/tables/pagination-footer";
import { TableCell, TableHeader, TableRow } from "@/components/catalyst-ui/table";
import { toHumanReadableDate } from "@/utils/time";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import ListActionMenu from "@/components/lists/basic-list-action-menu";
import { Badge } from "@/components/catalyst-ui/badge";

export default async function PrescriptionVerificationPage() {
    const { data: scripts, error } = await createClient().from('prescriptions')
        .select('*, users!inner(profiles!inner(first_name, last_name))')
        .limit(10).throwOnError();

    return (
        <>
            <DebugButton />
            <Heading>Rx Qv1</Heading>
            <Divider />
            <CustomTable headers={
                <>
                    <TableHeader>
                        Patient Name
                    </TableHeader>
                    <TableHeader>
                        Drug
                    </TableHeader>
                    <TableHeader>
                        Needs attention since
                    </TableHeader>
                    <TableHeader>
                        Dose
                    </TableHeader>
                    <TableHeader >
                        Status
                    </TableHeader>
                    <TableHeader className="relative w-0">
                        <span className="sr-only">Actions</span>
                    </TableHeader>
                </>
            }>
                {scripts?.map((script) => (
                    <TableRow href={`/pharmacist/qv1/${script.id}`}>
                        <TableCell>
                            <Text>{stringifyName(script.users.profiles)}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{script.name}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{toHumanReadableDate({ month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }, script.created_at)}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{script.dosage}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>
                            <Badge color="rose">Requires Verification</Badge>
                            </Text>
                        </TableCell>
                        <TableCell>
                            <ListActionMenu actions={[]}/>
                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>
            {/* <Paginator/> */}
        </>
    )
}