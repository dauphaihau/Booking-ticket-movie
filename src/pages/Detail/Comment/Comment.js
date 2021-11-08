import React, {useReducer} from 'react';
import {Button, Checkbox, Input, Textarea} from "@nextui-org/react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useFormik} from "formik";
import dataUser from '../../../assets/data/dataUserComment.json'
import _ from "lodash";

const defaultValue = {
    arrUserComment: dataUser
}

const Reducer = (state, action) => {
    switch (action.type) {
        case 'comment': {
            state.arrUserComment = [...state.arrUserComment, action.userComment];
            return {...state};
        }
        case 'plus': {
            let index = _.findIndex(state.arrUserComment, user => user.id === action.id);
            state.arrUserComment[index].like += 1;
            return {...state};
        }
        case 'minus': {
            let index = _.findIndex(state.arrUserComment, user => user.id === action.id);
            state.arrUserComment[index].like -= 1;
            return {...state};
        }
        default:
            throw new Error('there is error')
    }
}

function Comment() {

    const [state, dispatch] = useReducer(Reducer, defaultValue)

    const formik = useFormik({
        initialValues: {
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            id: 11,
            name: '',
            like: 0,
            comment: '',
            time: 'Just now'
        },
        onSubmit: userComment => {
            dispatch({type: 'comment', userComment})
        }
    })

    return <div>

        {/*Desktop - Ipad*/}
        <div className='hidden md:block bg-white rounded-lg px-8 mb-16'>
            <div className='md:grid grid-cols-3 gap-x-8 py-9'>
                <div className='col-span-2 '>
                    <h1 className='font-bold text-xl mb-4'>COMMENTS</h1>
                    <hr/>
                    <div className='h-[600px] overflow-y-scroll'>
                        {_(state.arrUserComment).clone().reverse().map((infoComments, inx) => {
                            return <div className='flex mb-[0.7rem] mt-4' key={inx}>
                                <figure>
                                    <img className='rounded rounded-full h-8 w-8 md:h-16 md:w-16'
                                         src={infoComments.avatar}
                                         alt="avatar"
                                         onError={(e) => {
                                             e.target.onError = null;
                                             e.target.src = 'https://2.bp.blogspot.com/-9Xo208rSAno/XblhzhSkDsI/AAAAAAAAA-8/52S3YHerkdMiWGSLu96-cLtn5zMgcwgcACLcBGAsYHQ/s1600/sam-carter-GHOiyov2TSQ-unsplash.jpg'
                                         }}
                                    />
                                </figure>
                                <div className='ml-4 w-10/12'>
                                    <p className='mt-0 font-bold mb-[5px]'>{infoComments.name} &middot; <span
                                        className='text-xs font-normal leading-4 text-gray-500'>
                                        {infoComments.time}</span>
                                    </p>
                                    <h3 className="text-sm font-medium leading-5">
                                        {infoComments.comment}
                                    </h3>
                                    <ul className="cursor-pointer flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500 m-0">
                                        <li>{infoComments.like}</li>
                                        <li><KeyboardArrowUpIcon className='mt-[-4px]' onClick={() => dispatch({
                                            type: "plus",
                                            id: infoComments.id
                                        })}/></li>
                                        <li><KeyboardArrowDownIcon className='mt-[-4px]' onClick={() => dispatch({
                                            type: "minus",
                                            id: infoComments.id
                                        })}/>
                                        </li>
                                        <li>&middot;</li>
                                        <li>Reply</li>
                                        <li>&middot;</li>
                                        <li>Share</li>
                                    </ul>
                                    <div>{infoComments.reply?.map((reply, idx) => {
                                        return <div className='flex my-2' key={idx}>
                                            <figure>
                                                <img className='rounded rounded-full h-8 w-8 md:h-16 md:w-16'
                                                     src={` https://i.pravatar.cc/150${inx}`}
                                                     alt="avatar"/>
                                            </figure>
                                            <div className='ml-4 w-10/12'>
                                                <p className='mt-0 font-bold mb-[5px]'>{reply.name} &middot; <span
                                                    className='text-xs font-normal leading-4 text-gray-500'>{reply.time}</span>
                                                </p>
                                                <h3 className="text-sm font-medium leading-5">
                                                    {reply.comment}
                                                </h3>
                                                <ul className="cursor-pointer flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500 m-0">
                                                    <li>{reply.like}</li>
                                                    <li><KeyboardArrowUpIcon className='mt-[-4px]'/></li>
                                                    <li><KeyboardArrowDownIcon className='mt-[-4px]'/></li>
                                                    <li>&middot;</li>
                                                    <li>Reply</li>
                                                    <li>&middot;</li>
                                                    <li>Share</li>
                                                </ul>
                                            </div>
                                        </div>
                                    })}</div>
                                </div>

                            </div>
                        })}
                    </div>
                </div>
                <div className='mt-8 md:mt-0 col-span-1'>
                    <h1 className='font-bold text-xl mb-4'>LEAVE A COMMENT</h1>
                    <hr className='mb-4'/>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <form onSubmit={formik.handleSubmit}>
                        <Input label="NAME *"
                               name='name'
                               className='mb-4'
                               fullWidth={true}
                               onChange={formik.handleChange}
                               placeholder="John"/>
                        <Input label="EMAIL *"
                               name='email'
                               className='mb-8'
                               fullWidth={true}
                               placeholder="dauphaihau@gmail.com"/>
                        <div>
                            <Checkbox checked={false}/>
                        </div>
                        <p className='text-sm m-0 mb-4'>Save my name, email, and website in this browser for the next
                            time i comment.</p>
                        <Textarea
                            style={{height: '130px'}}
                            fullWidth={true}
                            className='mb-4 '
                            required
                            name='comment'
                            onChange={formik.handleChange}
                            label="COMMENT"
                            placeholder="Enter your comment"
                        />
                        <Button htmlType='submit' type='submit' shadow auto>POST COMMENT</Button>
                    </form>
                </div>
            </div>
        </div>

        {/*Mobile*/}
        <div className='md:hidden '>
            <div className='bg-white rounded-lg px-8 mb-16'>
                <div className='mt-8 md:mt-0 py-6'>
                    <h1 className='font-bold text-xl mb-4'>LEAVE A COMMENT</h1>
                    <hr className='mb-4'/>
                    <form onSubmit={formik.handleSubmit}>
                        <Input label="NAME *"
                               name='name'
                               className='mb-4'
                               fullWidth={true}
                               onChange={formik.handleChange}
                               placeholder="John"/>
                        <Input label="EMAIL *"
                               name='email'
                               className='mb-8'
                               fullWidth={true}
                               placeholder="dauphaihau@gmail.com"/>
                        <Textarea
                            style={{height: '130px'}}
                            fullWidth={true}
                            className='mb-4 '
                            required
                            name='comment'
                            onChange={formik.handleChange}
                            label="COMMENT"
                            placeholder="Enter your comment"
                        />
                        <Button size='small' htmlType='submit' type='submit' shadow auto>POST COMMENT</Button>
                    </form>
                </div>

            </div>
            <div className='bg-white rounded-lg px-8 mb-16 py-6'>
                <h1 className='font-bold text-xl mb-4'>COMMENTS</h1>
                <hr/>
                <div className='h-[600px] overflow-y-scroll'>
                    {_(state.arrUserComment).clone().reverse().map((infoComments, inx) => {
                        return <div className='flex mb-[0.7rem] mt-4' key={inx}>
                            <figure>
                                <img className='rounded rounded-full h-8 w-8 md:h-16 md:w-16'
                                     src={infoComments.avatar}
                                     alt="avatar"
                                     onError={(e) => {
                                         e.target.onError = null;
                                         e.target.src = 'https://2.bp.blogspot.com/-9Xo208rSAno/XblhzhSkDsI/AAAAAAAAA-8/52S3YHerkdMiWGSLu96-cLtn5zMgcwgcACLcBGAsYHQ/s1600/sam-carter-GHOiyov2TSQ-unsplash.jpg'
                                     }}
                                />
                            </figure>
                            <div className='ml-4 w-10/12'>
                                <p className='mt-0 font-bold mb-[5px]'>{infoComments.name} &middot; <span
                                    className='text-xs font-normal leading-4 text-gray-500'>
                                {infoComments.time}</span>
                                </p>
                                <h3 className="text-sm font-medium leading-5">
                                    {infoComments.comment}
                                </h3>

                                <ul className="cursor-pointer flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500 m-0">
                                    <li>{infoComments.like}</li>
                                    <li><KeyboardArrowUpIcon className='mt-[-4px]' onClick={() => dispatch({
                                        type: "plus",
                                        id: infoComments.id
                                    })}/></li>
                                    <li><KeyboardArrowDownIcon className='mt-[-4px]' onClick={() => dispatch({
                                        type: "minus",
                                        id: infoComments.id
                                    })}/>
                                    </li>
                                    <li>&middot;</li>
                                    <li>Reply</li>
                                    <li>&middot;</li>
                                    <li>Share</li>
                                </ul>
                                <div>{infoComments.reply?.map((reply, idx) => {
                                    return <div className='flex my-2' key={idx}>
                                        <figure>
                                            <img className='rounded rounded-full h-8 w-8 md:h-16 md:w-16'
                                                 src={` https://i.pravatar.cc/150${inx}`}
                                                 alt="avatar"/>
                                        </figure>
                                        <div className='ml-4 w-10/12'>
                                            <p className='mt-0 font-bold mb-[5px]'>{reply.name} &middot; <span
                                                className='text-xs font-normal leading-4 text-gray-500'>{reply.time}</span>
                                            </p>
                                            <h3 className="text-sm font-medium leading-5">
                                                {reply.comment}
                                            </h3>
                                            <ul className="cursor-pointer flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500 m-0">
                                                <li>{reply.like}</li>
                                                <li><KeyboardArrowUpIcon className='mt-[-4px]'/></li>
                                                <li><KeyboardArrowDownIcon className='mt-[-4px]'/></li>
                                                <li>&middot;</li>
                                                <li>Reply</li>
                                                <li>&middot;</li>
                                                <li>Share</li>
                                            </ul>
                                        </div>
                                    </div>
                                })}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Comment;