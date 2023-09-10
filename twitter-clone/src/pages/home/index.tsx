import { useEffect, useState, useContext } from 'react';
import { AppLeftSideBar } from './components/left-bar';
import './index.scss';
import { LoadingState } from '../../enums/loading';
import { apiService } from '../../services/api';
import { Tweet } from '../../entities/tweet';
import { ServerError } from '../../entities/utils';
import { TweetCard } from './components/tweet-card';
import { AppButton } from '../../components/button';
import { AppLink } from '../../components/link';
import { UserContext } from '../../providers/user';
import { imageOrDefaultImage } from '../../utils/functions';

export function HomePage() {
    const [loadTweets, setLoadTweets] = useState(LoadingState.LOADING);
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [newTweet, setNewTweet] = useState<string>();
    const userContext = useContext(UserContext);

    async function getTweets() {
        setLoadTweets(LoadingState.LOADING);
        const response = await apiService.get<any, Tweet[]>("/tweets");
        if (response instanceof ServerError) {
            setLoadTweets(LoadingState.ERROR);
        }
        else {
            setLoadTweets(LoadingState.NONE);
            setTweets(response);
        }
    }

    async function postTweet() {
        if (!!newTweet) {
            const response = await apiService.post<Tweet, Tweet>("/me/tweets", {
                content: newTweet,
                //@ts-ignore
                user: { id: apiService.getUser()! },
            });

            if (response instanceof ServerError) {
                alert("Unable to post tweet");
            }
            else {
                setTweets([response, ...tweets]);
                setNewTweet("");
            }
        } 
    }

    useEffect(() => {
        getTweets();
    }, []);

    return (
        <div className="home-container">
            <div></div>
            <AppLeftSideBar />
            <section className="content">
                <header className="content-header">
                    <span>Home</span>
                    <div>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </header>
                <div className="tweet">
                    <div className="left-column">
                        <img className="profile-image" src={imageOrDefaultImage(userContext.user?.profilePicture)} />
                    </div>
                    <div className="right-column">
                        <form className="top-row">
                            <input style={{ color: 'black' }} value={newTweet} onChange={(e) => setNewTweet(e.target.value)} placeholder="What's happening?" />
                        </form>
                        <div className="bottom-row">
                            <div className="buttons">
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                                            <circle cx="8.868" cy="8.309" r="1.542"></circle>
                                        </g>
                                    </svg>
                                </div>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"></path><path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path><path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z">
                                            </path>
                                            <circle cx="14.738" cy="9.458" r="1.478"></circle><circle cx="9.262" cy="9.458" r="1.478">
                                            </circle>
                                        </g>
                                    </svg>
                                </div> 
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2z"></path>
                                            <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2zM18 2.2h-1.3v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H7.7v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H4.8c-1.4 0-2.5 1.1-2.5 2.5v13.1c0 1.4 1.1 2.5 2.5 2.5h2.9c.4 0 .8-.3.8-.8 0-.4-.3-.8-.8-.8H4.8c-.6 0-1-.5-1-1V7.9c0-.3.4-.7 1-.7H18c.6 0 1 .4 1 .7v1.8c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-5c-.1-1.4-1.2-2.5-2.6-2.5zm1 3.7c-.3-.1-.7-.2-1-.2H4.8c-.4 0-.7.1-1 .2V4.7c0-.6.5-1 1-1h1.3v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5h7.5v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5H18c.6 0 1 .5 1 1v1.2z"></path>
                                            <path d="M15.5 10.4c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.8-6.2-6.2-6.2zm0 11c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7c0 2.5-2.1 4.7-4.7 4.7z"></path><path d="M18.9 18.7c-.1.2-.4.4-.6.4-.1 0-.3 0-.4-.1l-3.1-2v-3c0-.4.3-.8.8-.8.4 0 .8.3.8.8v2.2l2.4 1.5c.2.2.3.6.1 1z"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <button style={{ opacity: (newTweet?.length || 0) > 0 ? 1: 0.5 }} className="tweet-btn" onClick={postTweet}>Post</button>
                        </div>
                    </div>
                </div>
                <div className="space">
                </div>
                {loadTweets === LoadingState.LOADING && (
                    <div className="d-flex w-100 h-25 justify-content-center align-items-center">
                        <div className='spinner'></div>
                    </div>
                )}
                {loadTweets === LoadingState.NONE && (
                    <>
                        {tweets.map((tweet, index) => (
                            <TweetCard tweet={tweet} key={index}/>
                        ))}
                    </>
                )}
                {loadTweets === LoadingState.ERROR && (
                    <div className='d-flex flex-column w-100 h-25 justify-content-center align-items-center'>
                        <p >Unable to load tweets, you can try again</p>
                        <div onClick={getTweets} className="btn btn-primary rounded-pill">
                            Try again
                        </div>
                    </div>
                )}
            </section>
            <aside className="right-side">
                <div className="search-bar">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                            </path>
                        </g>
                    </svg>
                    <input className="search" placeholder="Search" />
                </div>
                <div className="trends">
                    <div className="trends-header">
                        <h5 >Subscribe to Premium</h5>
                        <p className='dark'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                        <AppButton
                            title='Subscribe'
                            taste='dark'
                        />
                    </div>
                    <div className="trends-items">
                        <div className="trends-items-header">
                            <h5 >Trends for you</h5>
                        </div>
                        <div className="trends-item">
                            <div>
                                <span>Trending in Pakistan</span>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <circle cx="5" cy="12" r="2"></circle>
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="19" cy="12" r="2"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <strong className="hashtag">#actress</strong>
                            <span>26.6k posts</span>
                        </div>
                        <div className="trends-item">
                            <div>
                                <span>ChatGPT</span>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <circle cx="5" cy="12" r="2"></circle>
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="19" cy="12" r="2"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <strong className="hashtag">Trending in Technology</strong>
                            <span>36.1k posts</span>
                        </div>
                        <div className="trends-item">
                            <div>
                                <span>Entertainment - Trending</span>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <circle cx="5" cy="12" r="2"></circle>
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="19" cy="12" r="2"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <strong className="hashtag">#JawanCreatesHistory</strong>
                            <span>35.6k posts</span>
                        </div>
                        <div className="trends-item">
                            <div>
                                <span>Trending in Pakistan</span>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <circle cx="5" cy="12" r="2"></circle>
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="19" cy="12" r="2"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <strong className="hashtag">#GilgitBaltistan</strong>
                            <span>10.2k posts</span>
                        </div>
                        <div className="trends-item">
                            <div>
                                <span>Sports - Trending</span>
                                <div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <circle cx="5" cy="12" r="2"></circle>
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="19" cy="12" r="2"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <strong className="hashtag">#IndiaVsPakistan</strong>
                            <span>2,717 Tweet</span>
                        </div>
                        <div className='trends-show-more'>
                            <AppLink
                                link=''
                                text='Show More'
                            />
                        </div>
                    </div>
                </div>
                <div className="who-to-follow">
                    <div className="who-to-follow-header">
                        <p className='large dark'>Who to follow</p>
                    </div>
                    <div className="users">
                        <div className="user">
                            <img className="profile-image" src="https://www.indiablooms.com/world_pic/2021/407e48c69e323f5ad1d099b7d981be9d.jpg" />
                                <div>
                                    <div>
                                        <strong className="user-name">Imran Khan</strong>
                                        <span className="tag">@ImranKhanPTI</span>
                                    </div>
                                    <AppButton 
                                        title='Follow'
                                        taste='dark'
                                        onClick={() => {}}
                                    />
                                </div>
                        </div>
                        <div className="user">
                            <img className="profile-image" src="https://pbs.twimg.com/profile_images/1164155035930042368/6Xz8S4pg_400x400.jpg" />
                                <div>
                                    <div>
                                        <strong className="user-name">Tehreek-e-Insaaf</strong>
                                        <span className="tag">@InsafPK</span>
                                    </div>
                                    <AppButton 
                                        title='Follow'
                                        taste='dark'
                                        onClick={() => {}}
                                    />
                                </div>
                        </div>
                        <div className="user">
                            <img className="profile-image" src="https://pbs.twimg.com/profile_images/958997253892419586/Jb6NPqEa_400x400.jpg" />
                                <div>
                                    <div>
                                        <strong className="user-name">Salman Khan</strong>
                                        <span className="tag">@BeingHuman</span>
                                    </div>
                                    <AppButton 
                                        title='Follow'
                                        taste='dark'
                                        onClick={() => {}}
                                    />
                                </div>
                        </div>
                        <AppLink
                            link=''
                            text='Show More'
                        />
                    </div>
                </div>
                <hr className="line" />
                    <footer>
                        <nav>
                            <span>Terms of services</span>
                            <span>Privacy Policy</span>
                            <span>Cookie Policy</span>
                            <span>Accessibility</span>
                            <span>Ads info</span>
                            <span>More <svg viewBox="0 0 24 24" aria-hidden="true"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg></span>
                            <span>© 2023 X Corp.</span>
                        </nav>
                    </footer>
            </aside>
        </div>
    )
}