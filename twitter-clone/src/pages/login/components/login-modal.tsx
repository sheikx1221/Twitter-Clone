import { useState } from "react";
import { AppButton } from "../../../components/button";
import { AppTextHR } from "../../../components/hr-text";
import { AppInput } from "../../../components/input";
import { AppLink } from "../../../components/link";
import { AppLogo } from "../../../components/logo";
import './login-modal.scss';

interface Props {
    closeModal: () => void;
}
export function LoginModal(props: Props) {
    const [credentials, setCredentials] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)' }}
        >
            <div id="modal-view">
                <div className="mt-2">
                    <div
                        className="close-button"
                        onClick={props.closeModal}
                    >
                        <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <AppLogo width={35} height={35} />
                    </div>
                </div>
                <div
                    style={{ margin: '5% 25% auto', height: 'inherit' }}>
                    <div 
                        className="d-flex row justify-content-around"
                        style={{ height: '70%' }}>
                        <h2 className="basic bold">
                            Sign in to X
                        </h2>
                        <AppButton
                            title="Sign in with Google"
                            onClick={() => { }}
                            icon="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                        />

                        <AppTextHR />
                        <div className="w-100 my-2">
                            <AppInput
                                value={credentials}
                                type="email"
                                onChange={(value) => setCredentials(value)}
                                label="Phone, email or username"
                                placeholder="Phone, email or username"
                            />
                        </div>
                        <AppButton
                            taste="secondary"
                            title="Next"
                            onClick={() => { }}
                        />
                        <div className="my-2"></div>
                        <AppButton
                            title="Forgot password?"
                            onClick={() => { }}
                        />
                    </div>
                    <div
                        style={{ height: '10%' }}
                        className="w-100 my-2 d-flex h-25 align-items-end"
                    >
                        <p className="light">Don't have an account?</p>
                        <AppLink
                            text="Sign up"
                            link="http://localhost:3000/flow/register"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}