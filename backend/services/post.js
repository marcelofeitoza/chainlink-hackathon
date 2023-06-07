const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
require('dotenv').config()
const log4js = require('log4js');

const loggerPost = log4js.getLogger('post');

const prisma = new PrismaClient()

class Post {
    async Create(description, id) {
        //Call Solidity contract


        //Create post on database
        try {
            const post = await prisma.post.create({
                data: {
                    id: uuid(),
                    description: description,
                    authorId: id,
                    address: "0x000000000000000000",
                }
            })
            loggerPost.info(`Post ${post.id} created successfully`)
            return post
        } catch (error) {
            loggerPost.error(`Problems on server: ${error}`)
            throw new Error('Error creating post')
        }
    }

    async GetPosts() {
        try { 
            const posts = await prisma.post.findMany({
                include: {
                    author: true,
                },
            })
    
            return posts
        } catch (err) {
            loggerPost.error(`Problems on server: ${err}`)
            throw new Error('Error getting posts')
        }
    }

    async GetPostById(id) {
        let post;

        try {
            post = await prisma.post.findUnique({
                where: {
                    id: id
                },
                include: {
                    author: true,
                    posts: true,
                },
            })
        } catch (err) {
            loggerPost.error(`Problems on server: ${err}`)
            throw new Error('Error getting post')
        }

        if (!post) {
            throw new Error('Post not found')
        }

        return post
    }

    async GetPostsByAuthorId(id) {

        //Verify if user exists
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        try {
            const posts = await prisma.post.findMany({
                where: {
                    authorId: id
                },
                include: {
                    author: true,
                },
            })
    
            return posts
        } catch (err) {
            loggerPost.error(`Problems on server: ${err}`)
            throw new Error('Error getting posts')
        }
        
    }

    async deletePost(id) {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if (!post) {
            throw new Error('Post not found')
        }

        try {
            await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    unlisted: true
                }
            })
    
            return "Your post is from now hidden from the feed, but it still exists on the blockchain (we advised)."
        } catch (err) {
            loggerPost.error(`Problems on server: ${err}`)
            throw new Error('Error deleting post')
        }
       
    }
}

module.exports = {
    Post,
}