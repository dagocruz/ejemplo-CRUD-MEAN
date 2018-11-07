var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var EvaluatorSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
  nombreCompleto:{type:String},
  evaluaciones: [{id:{ type: Schema.Types.ObjectId, ref: 'User' }, value:Number,field:String}]
});

EvaluatorSchema.pre('save', function (next) {
    var evaluator = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(evaluator.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                evaluator.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//$2a$10$uWMY9eCEufqlN8o8xcVJYe7/AHA7t1EXlo2MATfSF2uGobJIvlpUC


EvaluatorSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Evaluator',EvaluatorSchema);
