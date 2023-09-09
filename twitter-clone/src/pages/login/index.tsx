import { useState } from 'react';
import { AppButton } from '../../components/button';
import { AppTextHR } from '../../components/hr-text';
import { AppLogo } from '../../components/logo';
import './index.scss';
import { LoginModal } from './components/login-modal';
import { SignupModal } from './components/signup-modal';

export function LoginPage() {
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);

    const closeLoginModal = () => setLoginModal(false);
    const closeSignupModal = () => setSignupModal(false);
    return (
        <>
            {loginModal && <LoginModal closeModal={closeLoginModal} />}
            {signupModal && <SignupModal closeModal={closeSignupModal} />}
            <div id="main">
                <div id="image">
                    <AppLogo width={"100%"} height={"100%"} />
                </div>
                <div id="login">
                    <div className='m-2'></div>
                    <h1 >Happening now</h1>
                    <h2 >Join today.</h2>

                    <div className='w-100'>
                        <AppButton
                            icon='https://www.svgrepo.com/show/303108/google-icon-logo.svg'
                            title='Sign up with Google'
                            onClick={() => { }}
                        />
                        <AppTextHR />
                        <AppButton
                            taste='primary'
                            title='Create account'
                            onClick={() => setSignupModal(true)}
                        />
                        <p id='sign-up-text'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                    </div>


                    <div className='w-100'>
                        <h5 className='basic bold'>Already have an account?</h5>
                        <AppButton
                            title='Sign In'
                            onClick={() => setLoginModal(true)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}