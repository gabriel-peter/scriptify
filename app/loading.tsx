import { Text } from "@/components/catalyst-ui/text";
import BasicSpinner from "@/components/loading/basic-spinner";

export default function Loading() {
    return (
        <div className="flex justify-center align-items">
            <BasicSpinner/>
            <Text>Loading...</Text>
        </div>
    );
}