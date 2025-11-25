import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth';
import { getUserById } from '@/lib/db';
import { updateProfileAction, changePasswordAction, logoutAction } from '@/app/actions';
import './page.css';

export default async function ProfilePage() {
    const userId = await getUserSession();

    if (!userId) {
        redirect('/login');
    }

    const user = await getUserById(userId);

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1 className="profile-title">My Profile</h1>
                    <p className="profile-subtitle">Manage your account settings</p>
                </div>

                <div className="profile-grid">
                    <div className="profile-card">
                        <h2>Personal Details</h2>
                        <form action={async (formData) => {
                            'use server';
                            await updateProfileAction(formData);
                        }}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={user.name}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={user.email}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                Update Details
                            </button>
                        </form>
                    </div>

                    <div className="profile-card">
                        <h2>Change Password</h2>
                        <form action={async (formData) => {
                            'use server';
                            await changePasswordAction(formData);
                        }}>
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="form-input"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                Change Password
                            </button>
                        </form>
                    </div>

                    <div className="logout-section">
                        <form action={logoutAction}>
                            <button type="submit" className="btn-danger">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
