import mongoose from '../db/mongoose';
import isEmail from "validator/lib/isEmail";

const Decimal = require("mongoose-float").loadType(mongoose, 2);

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    /**
     * Fakturacne udaje
     */
    company: {
        type: String,
        unique: true,
    },
    street: String,
    city: String,
    psc: String,
    country: String,
    ico: {
        type: String,
        unique: true,
    },
    dic: {
        type: String,
        unique: true,
    },
    icdph: {
        type: String,
        unique: true,
    },

    /**
     * Korespondencne udaje
     */
    post_company: {
        type: String,
        unique: true,
    },
    post_street: String,
    post_city: String,
    post_psc: String,
    post_country: String,

    /**
     * Kontaktne udaje
     */
    emails: [{
        email: {
            type: String,
            trim: true,
            validate: [isEmail, "Neplatný formát e-mailu"]
        },
        comment: String
    }],
    phones: [{
        phone: String,
        comment: String
    }],

    // Hodinova sadzba
    price_hour: {
        type: Decimal
    },

    // Kontaktna osoba
    contact_person: String,

    description: {
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date
    }
});

export default mongoose.model("Client", clientSchema);