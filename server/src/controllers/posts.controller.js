import {
  createService,
  findAllService,
  countPosts,
  topPostsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
} from '../services/posts.service.js';

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({
        message: "Submit all fields for registration",
      })
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message })
  };
};

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    };

    if (!offset) {
      offset = 0;
    };

    const posts = await findAllService(offset, limit);
    const total = await countPosts();

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    if (posts.length === 0) {
      return res.status(400).send({ message: 'There are no registered posts' })
    };

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: posts.map((postsItems) => ({
        id: postsItems._id,
        title: postsItems.title,
        text: postsItems.text,
        banner: postsItems.banner,
        likes: postsItems.likes,
        Comments: postsItems.comments,
        name: postsItems.user.name,
        userName: postsItems.user.username,
        userAvatar: postsItems.user.avatar,
      }))
    });
  } catch (err) {
    res.status(500).send({ message: err.message })
  };
};

export const topPosts = async (req, res) => {
  try {
    const post = await topPostsService();

    if (!post) {
      return res.status(400).send({ message: 'There is no registered post' });
    };

    res.send({
      post: {
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        Comments: post.comments,
        name: post.user.name,
        userName: post.user.username,
        userAvatar: post.user.avatar,
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  };

};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await findByIdService(id)

    res.send({
      post: {
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        Comments: post.comments,
        name: post.user.name,
        userName: post.user.username,
        userAvatar: post.user.avatar,
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  };
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const posts = await searchByTitleService(title);

    if (posts.length === 0) {
      return res.status(400).send({ message: 'There are no posts with this title' })
    }

    res.send({
      results: posts.map((postsItems) => ({
        id: postsItems._id,
        title: postsItems.title,
        text: postsItems.text,
        banner: postsItems.banner,
        likes: postsItems.likes,
        Comments: postsItems.comments,
        name: postsItems.user.name,
        userName: postsItems.user.username,
        userAvatar: postsItems.user.avatar,
      }))
    });
  } catch (err) {
    res.status(500).send({ message: err.message })
  };
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const posts = await byUserService(id);

    return res.send({
      results: posts.map((postsItems) => ({
        id: postsItems._id,
        title: postsItems.title,
        text: postsItems.text,
        banner: postsItems.banner,
        likes: postsItems.likes,
        Comments: postsItems.comments,
        name: postsItems.user.name,
        userName: postsItems.user.username,
        userAvatar: postsItems.user.avatar,
      }))
    });
  } catch (err) {
    res.status(500).send({ message: err.message })
  };
}

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    };

    const posts = await findByIdService(id);

    if (String(posts.user._id) !== req.userId) {
      return res.status(400).send({
        message: "You didn't update this post",
      });
    };

    await updateService(id, title, text, banner);

    return res.send({ message: "Post successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message })
  };
};