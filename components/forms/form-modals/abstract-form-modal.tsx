import { Button } from "@/components/catalyst-ui/button";
import { DialogBody, DialogActions, Dialog, DialogTitle, DialogDescription } from "@/components/catalyst-ui/dialog";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode } from "react";

export default function FormModal({ open, setOpen, children, buttonName }: { open: boolean, setOpen: (x: boolean) => void, children: ReactNode, buttonName?: string }) {
    return (
        <>
            <Dialog open={open} onClose={setOpen}>
                {/* <DialogTitle>Refund payment</DialogTitle>
                <DialogDescription>
                    The refund will be reflected in the customer’s bank account 2 to 3 business days after processing.
                </DialogDescription> */}
                {children}
                {/* <DialogBody>
          <Field>
            <Label>Amount</Label>
            <Input name="amount" placeholder="$0.00" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Refund</Button>
        </DialogActions> */}
            </Dialog>
            {/* BUTTON */}
            {buttonName && <Button
                type="button"
                onClick={() => setOpen(true)}
            >
                {buttonName}
            </Button>}
        </>
    )
}

{/* <Transition.Root show={open} as={Fragment}>
<Dialog as="div" className="relative z-10" onClose={setOpen}>
    <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <div className="mt-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Transition.Child>
        </div>
    </div>
</Dialog>
</Transition.Root> */}