import React, { useState, useRef } from 'react'
import type { FeedPostType } from '../../types/feed';
import type { CommentType } from '../../types/comment';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Trash2, User2 } from 'lucide-react';
import Spinner from '../General/Spinner';


interface FeedPageProps {
    post: FeedPostType;
}

const FeedPost = ({ post }: FeedPageProps) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const [likes, setLikes] = useState<String[]>(post.likes)
    const [likeCount, setLikeCount] = useState<number>(post.likeCount);
    const [loading, setLoading] = useState(false);
    const [showComments, setShowComments] = useState<boolean>(false)
    const [comments, setComments] = useState<CommentType[]>([])
    const [commentText, setCommentText] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentsCount, setCommentsCount] = useState<number>(
        post.commentsCount,
    );
    const [expanded, setExpanded] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isOverflowing, setisOverflowing] = useState<boolean>(false)

    const isLikedByMe = user ? likes.includes(user._id) : false;

    const handleToggleLike = async () => {
    }

    const fetchComments = async () => {

    }

    const handleToggleComments = async () => {

    }

    const handleAddComment = async () => {

    }

    const handleDeleteComment = async (commentId: string) => {

    }
    return (
        <section className='min-w-[60vw] md:px-32 md:py-8'>
            <div className='flex flex-col gap-2'>
                {/* Headers */}
                <div className='flex items-center gap-2'>
                    {post.owner?.profileImage ? (
                        <Link to={`/profile/${post.owner.username}`}>
                            <img
                                className='w-8 h-8 rounded-full object-cover'
                                src={post.owner.profileImage}
                                alt="profile"
                            />
                        </Link>
                    ) : (
                        <Link to={`/profile/${post.owner.username}`}>
                            <User2 className='text-white' />
                        </Link>
                    )}
                    <Link to={`/profile/${post.owner.username}`}>
                        <span className="text-white">{post.owner.username}</span>
                    </Link>
                </div>

                <span className='text-xs text-white/60'>
                    {new Date(post.createdAt).toLocaleString()}
                </span>

                {post.image && <img src={post.image} className="rounded-xl" />}

                {/* Post content with read more */}

                <div className='relative'>
                    <div
                        ref={contentRef}
                        className={`prose prose-invert max-w-none text-white transition-all duration-300 ${expanded ? "" : "line-clamp-3 overflow-hidden"
                            }`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    {isOverflowing && (
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className='mt-1 text-sm text-white/60 cursor-pointer hover:underline'
                        >
                            {expanded ? "Show less" : "More"}
                        </button>
                    )} </div>

                {/* Action */}
                <div className='flex items-center gap-4'>
                    <button
                        disabled={loading}
                        onClick={handleToggleLike}
                        className='flex items-center gap-1 text-white hover:text-pink-500 disabled:opacity-50'
                    >
                        <Heart
                            size={20}
                            className={`cursor-pointer ${isLikedByMe ? "fill-pink-500 text-pink-500" : ""}`}
                        />
                        <span className='text-sm'>{likeCount}</span>
                    </button>

                    <button
                        onClick={handleToggleComments}
                        className='flex items-center gap-1 text-white/80 hover:text-white cursor-pointer'
                    >
                        <MessageCircle size={20} />
                        <span className="text-sm">{commentsCount}</span>
                    </button>
                </div>

                {/* Comments */}
                {showComments && (
                    <div className='mt-4 space-y-3 border-t border-white/10 pt-4'>
                        {loadingComments ? (
                            <Spinner />
                        ) : comments.length === 0 ? (
                            <p className="text-white/60 text-sm">No comments yet</p>
                        ) : (
                            comments.map((comment) => {
                                const isPostOwner = user?._id === post.owner._id;
                                const isCommentOwner = user?._id === comment.commentedBy._id;
                                const canDelete = isPostOwner || isCommentOwner;

                                return (
                                    <div
                                        key={comment._id}
                                        className='flex items-start gap-2 justify-between'
                                    >
                                        <div className='flex gap-2'>
                                            <img
                                                src={
                                                    comment.commentedBy.profileImage || '/default-avatar.png'
                                                }
                                                className='w-8 h-8 rounded-full object-cover'/>
                                                <div>
                                                    <p className='text-sm text-white font-bold'>
                                                        {comment.commentedBy.username}
                                                    </p>
                                                    <p className='text-sm text-white/80'>
                                                        {comment.comment}
                                                    </p>
                                                </div>
                                        </div>
                                        {canDelete && (
                                            <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className='text-red-400 hover:text-red-500 cursor-pointer'
                                            title='Delete comment'
                                            >
                                                 <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                )
                            })
                        )}

                        {/* Add comment */}
                        <div className='flex gap-2 pt-2'>
                            <input 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className='flex-1 bg-white/5 text-white px-3 py-2 rounded-md'
                            placeholder='Write a comment'
                            />
                            <button
                            onClick={handleAddComment}
                            className='px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 cursor-pointer hover:scale-[1.02] bg-[#9929EA] text-white'
                            >
                                Post
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeedPost;
