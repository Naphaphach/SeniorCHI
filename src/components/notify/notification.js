import React, { Component, Fragment } from 'react'
import NotiLikeObj from './notificationLikeObj'
import NotiReportObj from './notificationReportObj'
import NotiTokenObj from './notificationTokenObj'
import NotiBookObj from './notificationBookObj'
import NotiWelObj from './notificationWelcomeObj'

class notification extends Component {
    render() {
        const { noti } = this.props
        return (
            <Fragment>
                {noti.length === 0 ? <div>nothing</div> :
                    noti.map(obj =>
                        obj.data.type === 'welcome' ? <NotiWelObj key={obj.id} data={obj}/> : 
                        obj.data.type === 'token' ? <NotiTokenObj key={obj.id} data={obj}/> : 
                        obj.data.type === 'book' ? <NotiBookObj key={obj.id} data={obj}/> : 
                        obj.data.type === 'report' ? <NotiReportObj key={obj.id} data={obj}/> : 
                        obj.data.type === 'like' ? <NotiLikeObj key={obj.id} data={obj}/> : null)}
            </Fragment>
        )
    }
}

export default (notification)