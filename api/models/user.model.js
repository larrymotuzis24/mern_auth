import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        unique:true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true,
    },
    profilePic:{
        type:String, 
        default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAXVBMVEX///8AAADp6ekhISH5+fl0dHRqamrj4+NwcHCbm5v09PT8/PxLS0tSUlIUFBTZ2dk5OTmpqalYWFgmJiajo6NiYmKTk5MJCQkuLi6AgIDLy8vBwcFERES5ubnR0dH5DsEtAAABwklEQVRoge2ZiZKCMAxAG045rCB4gfL/n6nOrutBw2onCbOzeT/wpjRJk2CMoiiKoiiKoiiKovwRgiCYxZvW66oJm2pdp9Lm2MING4vaW3imlVMv4JV4PjXAQkadOdQAmYR65VQDrATcG8S94Vdjx5Y4+BZ1b9ndFequuNW5Rd02Z3anO9S94y6teKjxB9uc7jnv2+xR955bbQ6o+8Du7lB3x+42JaIu+dWmR9y9gNvETrVM5xIdHepjIeI2+fg9qdhz+0aUvKiTSEp94fR49OokaL4Q9bezJ73QVT+RDt0gPRAp/5P8MvuL1ZQfii5Lmu8ca5KsE8uye2o/FLZeorLlmbtr2mfcn79oJ/q1lvXTp1jT8kXJ2CXXk+YrNZfa3bA8w7P7iJZvqAGWDAFfTF/1nZI+4sY5jZFQq/F1wxjiBQTWlLshbdUDfPp0YSnXy65N4hSEmYbPfxh0c+F7mf3Ikko9fKwGGIjcn972FaIbjzzUADSl9eTlppmT3nm+xpDM40Xo5Q4pnpTASw1AUds+K+V3KIq6+/fI71D8QMGXedNQrPr8wpwm0GMb+mAp3IEn8lOioiiKoiiKoiiKokxxBuKKEayBjIEyAAAAAElFTkSuQmCC',
        

    }
    
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;