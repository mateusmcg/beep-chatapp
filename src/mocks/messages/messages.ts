import { Message } from '../../models/messages/message';
import { User } from '../../models/users/user';

const userList: User[] = [
    {
        firstName: "Mateus",
        lastName: "Cerqueira",
        email: "mateus.mcg@gmail.com",
        avatar: "assets/img/avatar.png"
    },
    {
        firstName: "Mateus",
        lastName: "Cerqueira",
        email: "mateus.mcg@gmail.com",
        avatar: "assets/img/avatar.png"
    },
    {
        firstName: "Mateus",
        lastName: "Cerqueira",
        email: "mateus.mcg@gmail.com",
        avatar: "assets/img/avatar.png"
    },
    {
        firstName: "Mateus",
        lastName: "Cerqueira",
        email: "mateus.mcg@gmail.com",
        avatar: "assets/img/avatar.png"
    }
]

const messageList: Message[] = [
    { user: userList[0], date: new Date() },
    { user: userList[1], date: new Date() },
    { user: userList[2], date: new Date() },
    { user: userList[3], date: new Date() }
]

export const MESSAGE_LIST = messageList;