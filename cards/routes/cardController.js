const express = require("express");
const chalk = require("chalk");
const {auth} = require("../../auth/authService");
const {handleError} = require("../../utils/errorHandler");  
const {
  getCards,
  getCard,
  createCard,
  getMyCards,
  updateCard,
  likeCard,
  deleteCard,
} = require("../services/cardsService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards",auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cards = await getMyCards(userId);
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

/* Create Card */
router.post("/", auth, async (req, res) => {
  try {
    const { isBusiness, _id: userId } = req.user;
    if (!isBusiness) {
      return handleError(res, 403, "Only business users can create cards");
    }

    const card = await createCard({ ...req.body, user_id: userId });
    console.log(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);

    if (!card) return handleError(res, 404, "Card not found");

    if (String(card.user_id) !== String(req.user._id)) {
      return handleError(res, 403, "You can update only your own cards");
    }

    const updated = await updateCard(id, req.body);
    console.log(  chalk.yellowBright(`Card ${updated._id} updated by user ${req.user._id}`));
    return res.send(updated);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});



router.patch("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const card = await likeCard(id, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // לוודא שהכרטיס קיים לפני שמוחקים
    const card = await getCard(id);
    if (!card) return handleError(res, 404, "Card not found");

    console.log("DEBUG delete:", {
      cardOwner: card.user_id.toString(),
      currentUser: req.user._id,
      isAdmin: req.user.isAdmin,
    });

    // מעביר גם את המשתמש ל־service
    const deletedCard = await deleteCard(id, req.user);
    console.log(chalk.redBright(`Card ${deletedCard._id} deleted by user ${req.user._id}`));
    return res.send({ message: "Card deleted", "by " : req.user._id, deletedCard });
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});



module.exports = router;