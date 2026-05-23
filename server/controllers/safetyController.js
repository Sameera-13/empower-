const EmergencyNumber = require('../models/EmergencyNumber');
const SafetyTip = require('../models/SafetyTip');
const NationalOrg = require('../models/NationalOrg');
const asyncHandler = require('../utils/asyncHandler');

// ─── Emergency Numbers ────────────────────────────────────────────────────────

/**
 * @desc    List all emergency numbers
 * @route   GET /api/safety/emergency-numbers
 * @access  Public
 */
const listEmergencyNumbers = asyncHandler(async (req, res) => {
  const numbers = await EmergencyNumber.find().sort({ order: 1 });
  res.json({ success: true, data: numbers });
});

/**
 * @desc    Create an emergency number
 * @route   POST /api/safety/emergency-numbers
 * @access  Admin
 */
const createEmergencyNumber = asyncHandler(async (req, res) => {
  const number = await EmergencyNumber.create(req.body);
  res.status(201).json({ success: true, data: number });
});

/**
 * @desc    Update an emergency number
 * @route   PUT /api/safety/emergency-numbers/:id
 * @access  Admin
 */
const updateEmergencyNumber = asyncHandler(async (req, res) => {
  const number = await EmergencyNumber.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!number) {
    return res.status(404).json({ success: false, message: 'Emergency number not found' });
  }

  res.json({ success: true, data: number });
});

/**
 * @desc    Delete an emergency number
 * @route   DELETE /api/safety/emergency-numbers/:id
 * @access  Admin
 */
const deleteEmergencyNumber = asyncHandler(async (req, res) => {
  const number = await EmergencyNumber.findByIdAndDelete(req.params.id);

  if (!number) {
    return res.status(404).json({ success: false, message: 'Emergency number not found' });
  }

  res.json({ success: true, message: 'Emergency number deleted successfully' });
});

// ─── Safety Tips ──────────────────────────────────────────────────────────────

/**
 * @desc    List all safety tips
 * @route   GET /api/safety/tips
 * @access  Public
 */
const listSafetyTips = asyncHandler(async (req, res) => {
  const tips = await SafetyTip.find().sort({ order: 1 });
  res.json({ success: true, data: tips });
});

/**
 * @desc    Create a safety tip category
 * @route   POST /api/safety/tips
 * @access  Admin
 */
const createSafetyTip = asyncHandler(async (req, res) => {
  const tip = await SafetyTip.create(req.body);
  res.status(201).json({ success: true, data: tip });
});

/**
 * @desc    Update a safety tip category
 * @route   PUT /api/safety/tips/:id
 * @access  Admin
 */
const updateSafetyTip = asyncHandler(async (req, res) => {
  const tip = await SafetyTip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tip) {
    return res.status(404).json({ success: false, message: 'Safety tip not found' });
  }

  res.json({ success: true, data: tip });
});

/**
 * @desc    Delete a safety tip category
 * @route   DELETE /api/safety/tips/:id
 * @access  Admin
 */
const deleteSafetyTip = asyncHandler(async (req, res) => {
  const tip = await SafetyTip.findByIdAndDelete(req.params.id);

  if (!tip) {
    return res.status(404).json({ success: false, message: 'Safety tip not found' });
  }

  res.json({ success: true, message: 'Safety tip deleted successfully' });
});

// ─── National Orgs ────────────────────────────────────────────────────────────

/**
 * @desc    List all national organisations
 * @route   GET /api/safety/organizations
 * @access  Public
 */
const listNationalOrgs = asyncHandler(async (req, res) => {
  const orgs = await NationalOrg.find().sort({ order: 1 });
  res.json({ success: true, data: orgs });
});

/**
 * @desc    Create a national organisation
 * @route   POST /api/safety/organizations
 * @access  Admin
 */
const createNationalOrg = asyncHandler(async (req, res) => {
  const org = await NationalOrg.create(req.body);
  res.status(201).json({ success: true, data: org });
});

/**
 * @desc    Update a national organisation
 * @route   PUT /api/safety/organizations/:id
 * @access  Admin
 */
const updateNationalOrg = asyncHandler(async (req, res) => {
  const org = await NationalOrg.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!org) {
    return res.status(404).json({ success: false, message: 'Organisation not found' });
  }

  res.json({ success: true, data: org });
});

/**
 * @desc    Delete a national organisation
 * @route   DELETE /api/safety/organizations/:id
 * @access  Admin
 */
const deleteNationalOrg = asyncHandler(async (req, res) => {
  const org = await NationalOrg.findByIdAndDelete(req.params.id);

  if (!org) {
    return res.status(404).json({ success: false, message: 'Organisation not found' });
  }

  res.json({ success: true, message: 'Organisation deleted successfully' });
});

module.exports = {
  listEmergencyNumbers,
  createEmergencyNumber,
  updateEmergencyNumber,
  deleteEmergencyNumber,
  listSafetyTips,
  createSafetyTip,
  updateSafetyTip,
  deleteSafetyTip,
  listNationalOrgs,
  createNationalOrg,
  updateNationalOrg,
  deleteNationalOrg,
};
