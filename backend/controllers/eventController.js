import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';

// @desc    Obtenir tous les événements d'un utilisateur
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ userId: req.user._id });
  res.json(events);
});

// @desc    Obtenir les événements du jour
// @route   GET /api/events/daily
// @access  Private
const getDailyEvents = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const events = await Event.find({
    userId: req.user._id,
    startDate: { $gte: today, $lt: tomorrow }
  }).sort('startDate');
  
  res.json(events);
});

// @desc    Obtenir un événement par ID
// @route   GET /api/events/:id
// @access  Private
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Événement non trouvé');
  }
});

// @desc    Créer un nouvel événement
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate, location, type, childId, source, sourceId } = req.body;

  const event = await Event.create({
    userId: req.user._id,
    title,
    description: description || '',
    startDate,
    endDate: endDate || startDate,
    location: location || '',
    type: type || 'other',
    childId,
    source: source || 'manual',
    sourceId: sourceId || '',
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error('Données invalides');
  }
});

// @desc    Mettre à jour un événement
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate, location, type, childId } = req.body;

  const event = await Event.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (event) {
    event.title = title || event.title;
    event.description = description !== undefined ? description : event.description;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;
    event.location = location !== undefined ? location : event.location;
    event.type = type || event.type;
    event.childId = childId !== undefined ? childId : event.childId;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Événement non trouvé');
  }
});

// @desc    Supprimer un événement
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (event) {
    await event.deleteOne();
    res.json({ message: 'Événement supprimé' });
  } else {
    res.status(404);
    throw new Error('Événement non trouvé');
  }
});

export { getEvents, getDailyEvents, getEventById, createEvent, updateEvent, deleteEvent };
