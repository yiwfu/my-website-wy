'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/lib/auth';

export default function ProfilePage() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setBio(profile.bio || '');
        }
    }, [profile]);

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        setMessage('');

        const { error } = await updateProfile(user.id, {
            full_name: fullName,
            bio: bio,
        });

        setSaving(false);

        if (error) {
            setMessage('保存失败: ' + error);
        } else {
            setMessage('保存成功！');
            setEditing(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-400">加载中...</div>
            </div>
        );
    }

    if (!user || !profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>

                    {/* Profile Content */}
                    <div className="px-8 pb-8">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                                {profile.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                            </div>
                        </div>

                        {/* Message */}
                        {message && (
                            <div className={`mb-4 p-3 rounded ${message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message}
                            </div>
                        )}

                        {/* Profile Info */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    姓名
                                </label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-900 dark:text-white">
                                        {profile.full_name || '未设置'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    邮箱
                                </label>
                                <p className="text-lg text-gray-900 dark:text-white">{user.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    个人简介
                                </label>
                                {editing ? (
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="介绍一下自己..."
                                    />
                                ) : (
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {profile.bio || '暂无简介'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    注册时间
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {new Date(profile.created_at).toLocaleDateString('zh-CN')}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                {editing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {saving ? '保存中...' : '保存'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditing(false);
                                                setFullName(profile.full_name || '');
                                                setBio(profile.bio || '');
                                            }}
                                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
                                        >
                                            取消
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        编辑资料
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
