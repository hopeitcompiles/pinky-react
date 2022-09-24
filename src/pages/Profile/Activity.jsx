import React from 'react'
import { useContext } from 'react'
import Style from '../../assets/css/Profile.module.css'
import UserContext from '../../context/UserProvider'

export default function Activity({profile,image}) {
    const {sessionUser}=useContext(UserContext)
  return (
    <div className={`${Style.tab_pane} ${Style.fade} ${Style.active} 
                                ${Style.show}`} id="profile-post">
                                    <ul className={`${Style.timeline}`}>
                                        <li>
                                        <div className={`${Style.timeline_time}`}>
                                            <span className={`${Style.date}`}>today</span>
                                            <span className={`${Style.time}`}>04:20</span>
                                        </div>
                                        <div className={`${Style.timeline_icon}`}>
                                            <a >&nbsp;</a>
                                        </div>
                                        <div className={`${Style.timeline_body}`}>
                                            <div className={`${Style.timeline_header}`}>
                                                <span className={`${Style.userimage}`}>
                                                    <img src={image} alt={profile?.image}/></span>
                                                <span className={`${Style.username}`}><a>{profile?.name}</a> <small></small></span>
                                                <span className={`${Style.pull_right} ${Style.text_muted}`}>{profile?.lastName}</span>
                                            </div>
                                            <div className={`${Style.timeline_content}`}>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus turpis quis tincidunt luctus.
                                                    Nam sagittis dui in nunc consequat, in imperdiet nunc sagittis.
                                                </p>
                                            </div>
                                            <div className={`${Style.timeline_likes}`}>
                                                <div className={`${Style.stats_right}`}>
                                                    <span className={`${Style.stats_text}`}>259 Shares</span>
                                                    <span className={`${Style.stats_text}`}>21 Comments</span>
                                                </div>
                                                <div className={`${Style.stats}`}>
                                                    <span className="fa-stack fa-fw stats-icon">
                                                    <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                                    <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                                    </span>
                                                    <span className="fa-stack fa-fw stats-icon">
                                                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                                    <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`${Style.timeline_footer}`}>
                                                <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                                <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                                <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                                            </div>
                                            <div className={`${Style.timeline_comment_box}`}>
                                                <div className={`${Style.user}`}><img src={sessionUser?.image}/></div>
                                                <div className={`${Style.input}`}>
                                                    <form action="">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control rounded-corner" placeholder="Write a comment..."/>
                                                        <span className="input-group-btn p-l-10">
                                                        <button className="btn btn-primary f-s-12 rounded-corner" type="button">Comment</button>
                                                        </span>
                                                    </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        </li>
                                        
                                        <li>
                                        <div className="timeline-icon">
                                            <a>&nbsp;</a>
                                        </div>
                                        <div className="timeline-body">
                                            Loading...
                                        </div>
                                        </li>
                                    </ul>
                                </div>
  )
}
