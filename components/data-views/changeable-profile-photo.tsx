"use client"
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Status } from "../../app/actions/validation-helpers";
import updateUserProfilePhoto from "@/app/actions/user/update-profile-photo";
import { SubmitButton } from "../forms/submit-button";
import ProfilePhoto from "./profile-photo";



export default function ChangableProfilePhoto() {
    const [showSubmitButton, setShowSubmitButton] = useState(false)
    const [state, action] = useFormState(updateUserProfilePhoto, { status: Status.NOT_SUBMITTED })
    useEffect(() => {
        if (state.status !== Status.NOT_SUBMITTED) {
            setShowSubmitButton(false)
        }
    }, [state])
    return (
        <form action={action}>
            <div className="col-span-full pt-6 sm:flex items-center gap-x-8">
                <ProfilePhoto size={100}/>
                <div>
                    {showSubmitButton ? (<SubmitButton successAction={() => {}} isSuccess={state.status === Status.SUCCESS}/>):(
                        <label className="button primary block" htmlFor="single">
                        Change Photo
                    </label>)}
                    <input
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                        }}
                        type="file"
                        id="single"
                        name="pfp-upload"
                        accept="image/*"
                        onChange={() => setShowSubmitButton(true)}
                        disabled={false}
                    />
                    <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
            </div>
            {state.status === Status.ERROR && <p className="mt-2 text-sm text-red-600" id="error">{state.message}</p>}
        </form>
    );
}