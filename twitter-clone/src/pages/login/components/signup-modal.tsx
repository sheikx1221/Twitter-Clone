import { useEffect, useState } from 'react';
import { AppButton } from '../../../components/button';
import { AppDateInput } from '../../../components/date';
import { AppInput } from '../../../components/input';
import { AppLink } from '../../../components/link';
import { AppDate } from '../../../entities/utils';
import './signup-modal.scss';

interface Props {
    closeModal: () => void;
}
export function SignupModal(props: Props) {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [allowStep, setAllowStep] = useState(false);
    const [password, setPassword] = useState<string>();
    const [dateOfBirth, setDateOfBirth] = useState<AppDate>();
    const [toggleCreds, setToggleCreds] = useState<"email" | "phone">("phone");

    useEffect(() => {
        switch (step) {
            case 1:
                if (!!name && (!!email || !!phone) && !!dateOfBirth) setAllowStep(true);
                else setAllowStep(false);
                break;
            case 4:
                if (otp && otp.length == 4) setAllowStep(true);
                else setAllowStep(false);
                break;
            case 5:
                if (password && password.length >= 8) setAllowStep(true);
                else setAllowStep(false);
                break;
            default:
                break;
        }
    }, [name, email, phone, dateOfBirth, password, step, otp]);
    
    async function registerUser() {
        
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)' }}
        >
            <div id="modal-view">
                {step <= 5 && (
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
                )}

                {step === 1 && (
                    <>
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

                            <AppDateInput
                                date={dateOfBirth}
                                setDateString={setDateOfBirth}
                            />
                        </div>
                        <div style={{ alignItems: 'flex-end', margin: '0% 15% auto' }}>
                            <AppButton
                                taste={allowStep ? "dark": "disabled"}
                                title='Next'
                                onClick={() => setStep(2)}
                            />
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div
                            style={{ margin: '5% 10% auto', marginTop: '10%', height: '65%' }}
                            className='d-flex flex-column justify-content-around'>
                            <h3 className='basic bold'>
                                Customize your experience
                            </h3>

                            <div >
                                <p className='darker large'>
                                    Track where you see X content across the web
                                </p>
                                <div className='mb-2'></div>
                                <div className='d-flex column justify-content-start align-items-start'>
                                    <p className='flex-fill'>
                                        X uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.
                                    </p>
                                    <div className='checkbox-container'>
                                        <input
                                            className='form-checkbox mt-2'

                                            type='checkbox'
                                            value={"true"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='w-100'>
                                <p className='light'>
                                    By signing up, you agree to our Terms, Privacy Policy, and Cookie Use. X may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. Learn more
                                </p>
                            </div>
                        </div>
                        <div style={{ marginTop: '10%', alignItems: 'flex-end', margin: '0% 15% auto' }}>
                            <AppButton
                                taste='dark'
                                title='Next'
                                onClick={() => setStep(3)}
                            />
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div
                            style={{ margin: '5% 10% auto', height: '60%' }}
                            className='d-flex flex-column justify-content-center'>
                            <h3 className='basic bold mb-4'>
                                Create your account
                            </h3>
                            <div >
                                <AppInput
                                    label='Name'
                                    value={name}
                                    static={true}
                                    onFocus={() => setStep(1)}
                                    onChange={() => { }}
                                    placeholder='Name'
                                />
                                {toggleCreds === "email" ? (
                                    <AppInput
                                        label='Email'
                                        value={email}
                                        static={true}
                                        onFocus={() => setStep(1)}
                                        onChange={() => { }}
                                        placeholder='Email'
                                    />
                                ) : (
                                    <AppInput
                                        label='Phone'
                                        value={phone}
                                        static={true}
                                        onFocus={() => setStep(1)}
                                        onChange={() => { }}
                                        placeholder='Phone'
                                    />
                                )}

                                <AppInput
                                    label='Date of birth'
                                    value={`${dateOfBirth?.month} ${dateOfBirth?.date}, ${dateOfBirth?.year}`}
                                    static={true}
                                    onFocus={() => setStep(1)}
                                    onChange={() => { }}
                                    placeholder='Date of birth'
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '10%', alignItems: 'flex-end', margin: '0% 15% auto' }}>
                            <p className='light jusitfy'>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>
                            
                            <AppButton
                                taste='dark'
                                title='Next'
                                onClick={() => setStep(4)}
                            />
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div
                            style={{ margin: '5% 10% auto', height: '60%' }}
                            className='d-flex flex-column justify-content-center'>
                            <h3 className='basic bold mb-4'>
                                We sent you a code
                            </h3>
                            <p >Enter it below to verify {email || phone}.</p>
                            <div >
                                <AppInput
                                    autoFocus
                                    label='Verfication Code'
                                    value={otp}
                                    onChange={(text) => setOtp(text)}
                                    placeholder='Verification Code'
                                />
                                <AppLink 
                                    text={toggleCreds == "email" ? "Didn't receive email": "Didn't receive message?"}
                                    onClick={() => {}}
                                    link=''
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '10%', alignItems: 'flex-end', margin: '0% 15% auto' }}>
                            <AppButton
                                taste={allowStep ? "dark": "disabled"}
                                title='Next'
                                onClick={() => setStep(5)}
                            />
                        </div>
                    </>
                )}

                {step === 5 && (
                    <>
                        <div
                            style={{ margin: '5% 10% auto', height: '60%' }}
                            className='d-flex flex-column justify-content-center'>
                            <h3 className='basic bold mb-4'>
                                You'll need a password
                            </h3>
                            <p >Make sure it's 8 characters or more.</p>
                            <div >
                                <AppInput
                                    autoFocus
                                    label='Password'
                                    value={password}
                                    onChange={(text) => setPassword(text)}
                                    placeholder='Password'
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '10%', alignItems: 'flex-end', margin: '0% 15% auto' }}>
                            <AppButton
                                taste={allowStep ? "dark" : "disabled"}
                                title='Next'
                                onClick={() => setStep(6)}
                            />
                        </div>
                    </>
                )}

                {step === 6 && (
                    <>
                        <div
                            style={{ margin: '5% 10% auto', height: 'inherit' }}
                            className='d-flex flex-column justify-content-center align-items-center'>
                            <div className='spinner'></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}