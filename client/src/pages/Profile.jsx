import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { usePosts } from '../hooks/usePosts';
import PageContainer from '../components/layout/PageContainer';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import PostCard from '../components/domain/PostCard';
import OpportunityCard from '../components/domain/OpportunityCard';

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  const userId = user?._id || user?.id;

  // Profile form
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [twitter, setTwitter] = useState(user?.socialLinks?.twitter || '');
  const [linkedin, setLinkedin] = useState(user?.socialLinks?.linkedin || '');
  const [instagram, setInstagram] = useState(user?.socialLinks?.instagram || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  // Password
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Delete
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState('posts');

  // Posts
  const { data: postsData, isLoading: postsLoading } = usePosts(
    activeTab === 'posts' ? { author: userId, limit: 20 } : {}
  );
  const myPosts = postsData?.data || [];

  // Saved opportunities (from user object)
  const savedOpportunities = user?.savedOpportunities || [];

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('name', name);

    try {
      const { data } = await api.put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(data.data);
    } catch {
      // handle silently
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    setProfileSaving(true);

    try {
      const { data } = await api.put('/users/me', {
        name,
        bio,
        location,
        socialLinks: { twitter, linkedin, instagram },
      });
      setUser(data.data);
      setProfileMsg('Profile updated successfully.');
    } catch (err) {
      setProfileMsg(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMsg('');

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordSaving(true);
    try {
      await api.put('/users/me/password', {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      setPasswordMsg('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || 'Failed to change password.'
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await api.delete('/users/me');
      await logout();
      navigate('/');
    } catch {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const authorInitial = user?.name?.[0]?.toUpperCase() || '?';

  const tabs = [
    { value: 'posts', label: 'My Posts' },
    { value: 'saved', label: 'Saved Opportunities' },
    { value: 'activity', label: 'Activity' },
  ];

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => avatarRef.current?.click()}
            className="relative group shrink-0"
            aria-label="Change avatar"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-2xl font-bold border-2 border-border">
                {authorInitial}
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              ref={avatarRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </button>
          <div>
            <h1 className="text-2xl font-display text-dark">{user?.name}</h1>
            {user?.bio && (
              <p className="text-sm text-gray-500 mt-0.5">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Edit form */}
        <Card hover={false} className="mb-6">
          <h2 className="text-lg font-semibold text-dark mb-4">
            Edit Profile
          </h2>

          {profileMsg && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                profileMsg.includes('success')
                  ? 'bg-success/10 text-success'
                  : 'bg-danger/10 text-danger'
              }`}
            >
              {profileMsg}
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              placeholder="Tell us about yourself..."
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
            />

            <div>
              <p className="text-sm font-medium text-dark mb-2">
                Social Links
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Twitter URL"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                <Input
                  placeholder="Instagram URL"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" disabled={profileSaving}>
              {profileSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'posts' && (
          <div>
            {postsLoading ? (
              <LoadingSpinner className="py-12" />
            ) : myPosts.length === 0 ? (
              <EmptyState
                title="No posts yet"
                description="Your posts will appear here."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {savedOpportunities.length === 0 ? (
              <EmptyState
                title="No saved opportunities"
                description="Bookmarked opportunities will appear here."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedOpportunities
                  .filter((opp) => typeof opp === 'object' && opp !== null)
                  .map((opp) => (
                    <OpportunityCard key={opp._id} opportunity={opp} />
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">Coming soon</p>
          </div>
        )}

        {/* Change Password */}
        <Card hover={false} className="mt-8">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="w-full flex items-center justify-between"
          >
            <h2 className="text-lg font-semibold text-dark">
              Change Password
            </h2>
            <span className="text-gray-400 text-xl leading-none">
              {showPassword ? '\u2212' : '+'}
            </span>
          </button>

          {showPassword && (
            <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
              {passwordError && (
                <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm">
                  {passwordError}
                </div>
              )}
              {passwordMsg && (
                <div className="p-3 rounded-lg bg-success/10 text-success text-sm">
                  {passwordMsg}
                </div>
              )}
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
              <Button type="submit" disabled={passwordSaving}>
                {passwordSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          )}
        </Card>

        {/* Delete Account */}
        <div className="mt-8 pt-6 border-t border-border">
          <h2 className="text-lg font-semibold text-danger mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to permanently delete your account? All your posts and data will be removed. This cannot be undone."
        confirmLabel="Delete My Account"
        loading={deleting}
      />
    </PageContainer>
  );
}
