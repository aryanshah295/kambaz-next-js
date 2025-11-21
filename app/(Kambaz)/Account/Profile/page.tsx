"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { RootState } from "../../store";
import * as client from "../client";

export default function Profile() { 
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const fetchProfile = () => {
        if (!currentUser) return redirect("/Account/Signin");
        setProfile(currentUser);
    };
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };


    useEffect(() => {
        fetchProfile();
    }, []);

    return ( 
        <div id="wd-profile-screen"> 
            <h1>Profile</h1> 
            {profile && (
                <div>
                    <FormControl id="wd-username" className="mb-2"
                        defaultValue={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                    <FormControl id="wd-password" className="mb-2" type="password"
                        placeholder="password"
                        defaultValue={profile.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    />
                    <FormControl id="wd-password" className="mb-2" placeholder="First Name"
                        defaultValue={profile.firstName}
                        onChange = {(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                    <FormControl id="wd-firstname" className="mb-2" placeholder="Last Name"
                        defaultValue={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <FormControl id="wd-lastname"  className="mb-2" type="date"
                        defaultValue={profile.dob}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                    <FormControl id="wd-email" className="mb-2"
                        defaultValue={profile.email} placeholder="aa@email.com"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        type="email"/>
                    <FormSelect id="wd-role" className="mb-2"
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        value={profile.role}> 
                        <option value="USER" >User</option> 
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </FormSelect>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
                    <Button onClick={signout} className="btn-danger w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    )
}