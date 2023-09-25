const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);  // 500 = Internal Server Error
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      // JOIN with category
      include: [{ model: Product, through: ProductTag }],
    });
    if (!singleTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);  // 500 = Internal Server Error
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    if (!newTag) {
      res.status(404).json({ message: 'Unable to Create Tag!' });
      return;
    }
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);  // 500 = Internal Server Error
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        tag_name: req.body.tag_name,
      },
      {
        // Gets a tag based on the tag uid in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);  // 500 = Internal Server Error
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedTag);
  } catch {
    res.status(500).json(err);  // 500 = Internal Server Error
  }
});

module.exports = router;
