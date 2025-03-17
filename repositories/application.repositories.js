const { application } = require('../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
exports.getApplications = async ({
  month,
  year,
  page,
  limit,
  sort,
  sortBy,
  search,
}) => {
  const filter = {};

  // Filter berdasarkan bulan & tahun rencana_mulai
  if (month && year) {
    filter.rencana_mulai = {
      [Op.gte]: new Date(year, month - 1, 1), // Awal bulan
      [Op.lt]: new Date(year, month, 1), // Awal bulan berikutnya
    };
  }

  if (search) {
    filter.nama_lengkap = { [Op.iLike]: `%${search}%` };
  }

  const totalItems = await application.count({ where: filter });

  const data = await application.findAll({
    where: filter,
    attributes: [
      'id',
      'nama_lengkap',
      'rencana_mulai',
      'IPK',
      'tipe_magang',
      'program_studi',
      'google_drive_link',
      'motivation_letter_score',
      'CV_score',
    ],
    order: [[sortBy || 'nama_lengkap', sort || 'asc']],
    offset: (page - 1) * limit,
    limit: limit,
  });

  return {
    data,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};

exports.createApplication = async (payload) => {
  payload.id = uuidv4();
  const data = await application.create(payload);
  return data;
};

exports.updateApplication = async (id, payload) => {
  console.log('payload repo', payload);
  await application.update(payload, {
    where: { id },
  });

  const data = await application.findAll({
    where: {
      id,
    },
  });

  return data;
};

exports.deleteApplication = async (id) => {
  await application.destroy({
    where: { id },
  });

  return null;
};
