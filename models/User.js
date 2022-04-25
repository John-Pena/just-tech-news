const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our User model
class User extends Model {}

// Define table columns and configuration
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    // define an id column
    id: {
      // Use the special Sequelize DataTypes object provide what type of dat it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // Instruct that this is the Primay Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true
    },
    // Define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // There cannot be any duplicate email values in this table
      unique: true,
      // If allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // Define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // This means the password must be atleast four characters long
        len: [4]
      }
    }
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definitions.html#configuration)

    // Pass in out imported sequelize connection (the direct connection to our database)
    sequelize,
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // Make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;