import React from 'react'
import AuthLayout from "../../../component/authLayout"
import SignIn from './SignIn'

function Index() {
    return (
        <div>
            <AuthLayout>
                <SignIn />
            </AuthLayout>
        </div>
    )
}

export default Index