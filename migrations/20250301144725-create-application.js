'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nama_lengkap: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      no_hp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      universitas: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      IPK: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipe_magang: {
        allowNull: false,
        type: Sequelize.ENUM(['Magang Mandiri', 'Magang KRS']),
      },
      jurusan: {
        allowNull: false,
        type: Sequelize.ENUM([
          'Akuntansi',
          'Manajemen',
          'IT',
          'Hukum',
          'Statistika',
        ]),
      },
      bidang_peminatan: {
        allowNull: false,
        type: Sequelize.ENUM([
          'Moneter',
          'Makroprudensial',
          'Sistem Pembayaran',
          'Pengelolaan Uang Rupiah',
        ]),
      },
      skor_CV: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      skor_motivation_letter: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      semester: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rencana_mulai: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rencana_selesai: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      google_drive_link: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applications');
  },
};
