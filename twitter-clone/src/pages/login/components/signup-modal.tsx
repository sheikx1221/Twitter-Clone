import { useState } from 'react';
import { AppInput } from '../../../components/input';
import './signup-modal.scss';
import { AppDateInput } from '../../../components/date';
import { AppLink } from '../../../components/link';
import { AppButton } from '../../../components/button';

interface Props {
    closeModal: () => void;
}
export function SignupModal(props: Props) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [toggleCreds, setToggleCreds] = useState<"email" | "phone">("phone");

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)' }}
        >
            <div id="modal-view">
                <div
                    className='d-flex align-items-center'
                    style={{ zIndex: 10, position: 'absolute', width: 'inherit', background: 'white', height: '10%', borderRadius: '30%' }}>
                    <div
                        className='close-button'
                        onClick={props.closeModal}>
                        <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div style={{ marginLeft: '12%' }}>
                        <p className='large dark m-0'>
                            Step {step} of 5
                        </p>
                    </div>
                </div>

                <div style={{ margin: '5% 15% auto', marginTop: '10%', height: '75%' }}>
                    <h3 className='basic bold'>
                        Create your account
                    </h3>

                    <AppInput
                        autoFocus
                        value={name}
                        label="Name"
                        onChange={(text) => setName(text)}
                        placeholder="Name"
                    />
                    {toggleCreds === "email" ? (
                        <AppInput
                            value={email}
                            label="Email"
                            onChange={(text) => setEmail(text)}
                            placeholder="Email"
                        />
                    ) : (
                        <AppInput
                            value={phone}
                            label="Phone"
                            onChange={(text) => setPhone(text)}
                            placeholder='Phone'
                        />
                    )}

                    <div className='d-flex w-100 justify-content-end'>
                        <AppLink
                            text={toggleCreds === "email" ? "Use phone instead" : "Use email instead"}
                            link=''
                            onClick={() => setToggleCreds(toggleCreds === "email" ? "phone" : "email")}
                        />
                    </div>
                    <p className='dark'>
                        Date of birth
                    </p>
                    <p className='light'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>

                    <AppDateInput />
                </div>
                <div style={{ alignItems: 'flex-end', margin: '0% 15% auto'  }}>
                    <AppButton 
                        taste='disabled'
                        title='Next'
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}