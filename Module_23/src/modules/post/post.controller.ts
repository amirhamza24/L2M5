import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../middleware/auth";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    const result = await PostService.createPost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    //! paginationSortingHelper will return page, limit, skip, sortBy, sortOrder
    // const page = Number(req.query.page ?? 1);
    // const limit = Number(req.query.limit ?? 10);

    // const skip = (page - 1) * limit;

    // const sortBy = req.query.sortBy as string | undefined;
    // const sortOrder = req.query.sortOrder as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );

    const result = await PostService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new Error("Post id is required");
    }

    const result = await PostService.getPostById(postId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    console.log(user);
    const result = await PostService.getMyPosts(user.id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post fetched failed",
      details: e,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await PostService.updatePost(
      postId as string,
      req.body,
      user.id,
      isAdmin
    );
    res.status(200).json(result);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Post update failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await PostService.deletePost(
      postId as string,
      user.id,
      isAdmin
    );
    res.status(200).json(result);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Post delete failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getStats();
    res.status(200).json(result);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Stats fetched failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats,
};
