import { createService, findAllService, countPosts } from '../services/posts.service.js'

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    };

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

const findAll = async (req, res) => {
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
};

export { create, findAll };