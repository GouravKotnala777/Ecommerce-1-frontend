import { useEffect, useState } from "react";
import "../styles/pages/macro_calculator.scss";

const MacroCalculator = () => {
    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [age, setAge] = useState<number>(0);
    const [BMI, setBMI] = useState<number>(0);
    const [BMR, setBMR] = useState<number>(0);
    const [TDEE, setTDEE] = useState<number>(0);
    const [TDEERequire, setTDEERequire] = useState<number>(0);
    const [gender, setGender] = useState<string>("");
    const [activityLevel, setActivityLevel] = useState<string>("");
    const [goalIntensity, setGoalIntensity] = useState<string>("");
    const [caloricGoal, setCaloricGoal] = useState<string>("");
    const [microNutrientRatio, setMicroNutrientRatio] = useState<{carb:number; protein:number; fat:number;}>({carb:0, protein:0, fat:0});

    const func = () => {
        if (gender === "male") {
            setBMR((10*weight) + (6.25*height) - (5*age) + 5);
        }
        else if (gender === "female"){
            setBMR((10*weight) + (6.25*height) - (5*age) - 161);
        }
        setBMI((weight)/((height/100)**2));
    };

    const tdeeHandler = () => {
        setTDEE(BMR*Number(activityLevel));
    };

    const TDEERequireHandler = () => {
        if (caloricGoal === "loss_weight") {
            setTDEERequire(TDEE - (TDEE*Number(goalIntensity)/100));
            setMicroNutrientRatio({carb:((TDEE - (TDEE*Number(goalIntensity)/100))*40)/100, protein:((TDEE - (TDEE*Number(goalIntensity)/100))*30)/100, fat:((TDEE - (TDEE*Number(goalIntensity)/100))*30)/100});
        }
        else if (caloricGoal === "gain_muscle") {
            setTDEERequire(TDEE + (TDEE*Number(goalIntensity)/100));
            setMicroNutrientRatio({carb:((TDEE + (TDEE*Number(goalIntensity)/100))*50)/100, protein:((TDEE + (TDEE*Number(goalIntensity)/100))*30)/100, fat:((TDEE + (TDEE*Number(goalIntensity)/100))*20)/100});            
        }
        else if (caloricGoal === "maintenance") {
            setTDEERequire(TDEE);
            setMicroNutrientRatio({carb:0, protein:0, fat:0});
        }
    };

    useEffect(() => {
        func();
    }, [gender, height, weight, age]);

    useEffect(() => {
        tdeeHandler();
    }, [activityLevel]);

    useEffect(() => {
        TDEERequireHandler();
    }, [caloricGoal, goalIntensity]);

    return(
        <div className="macro_calculator_bg">
            <div className="heading" >Choose Your Gender :</div>
            <div className="inputs_cont">
                <label>
                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                    Male
                </label>
                <label>
                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                    Female
                </label>
            </div>



            <div className="heading" >Enter Your Height : {height}</div>
            <div className="inputs_cont">
                <input type="number" name="height" onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
            <div className="heading" >Enter Your Weight : {weight}</div>
            <div className="inputs_cont">
                <input type="number" name="weight" onChange={(e) => setWeight(Number(e.target.value))} />
            </div>
            <div className="heading" >Enter Your Age : {age}</div>
            <div className="inputs_cont">
                <input type="number" name="age" onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            

            <div className="heading" >Activity Level (not including exercise) :</div>
            <div className="inputs_cont">
                <label>
                    <input type="radio" name="activity_level" value="1.2" onChange={(e) => setActivityLevel(e.target.value)} />
                    Sedentary
                </label>
                <label>
                    <input type="radio" name="activity_level" value="1.375" onChange={(e) => setActivityLevel(e.target.value)} />
                    Lightly Active
                </label>
                <label>
                    <input type="radio" name="activity_level" value="1.55" onChange={(e) => setActivityLevel(e.target.value)} />
                    Moderately Active
                </label>
                <label>
                    <input type="radio" name="activity_level" value="1.725" onChange={(e) => setActivityLevel(e.target.value)} />
                    Very Active
                </label>
                <label>
                    <input type="radio" name="activity_level" value="1.9" onChange={(e) => setActivityLevel(e.target.value)} />
                    Super Active
                </label>
            </div>

            <div className="sub_result">
                <div className="sub_result_heading">Your TDEE :</div>
                <div className="sub_result_value">{Math.ceil(TDEE)} calories/day</div>
            </div>
            <div className="sub_result">
                <div className="sub_result_heading">Your BMI :</div>
                <div className="sub_result_value">{Math.round(BMI*10)/10}</div>
            </div>
            <div className="sub_result">
                <div className="sub_result_heading">Your BMR :</div>
                <div className="sub_result_value">{Math.ceil(BMR)} calories</div>
            </div>



            <div className="heading" >Set Caloric Goal :</div>
            <div className="inputs_cont">
                <label>
                    <input type="radio" name="caloric_goal" value="loss_weight"  onChange={(e) => setCaloricGoal(e.target.value)} />
                    Loss Weight
                </label>
                <label>
                    <input type="radio" name="caloric_goal" value="gain_muscle"  onChange={(e) => setCaloricGoal(e.target.value)} />
                    Gain Muscle
                </label>
                <label>
                    <input type="radio" name="caloric_goal" value="maintenance"  onChange={(e) => setCaloricGoal(e.target.value)} />
                    Maintenance
                </label>
            </div>



            <div className="heading" >Set Goal Intensity :</div>
            <div className="inputs_cont">
                <label>
                    <input type="radio" name="goal_intensity" value="10" onChange={(e) => setGoalIntensity(e.target.value)} />
                    Lightly
                </label>
                <label>
                    <input type="radio" name="goal_intensity" value="15" onChange={(e) => setGoalIntensity(e.target.value)} />
                    Moderately
                </label>
                <label>
                    <input type="radio" name="goal_intensity" value="20" onChange={(e) => setGoalIntensity(e.target.value)} />
                    Aggressively
                </label>
            </div>

            <div className="sub_result">
                <div className="sub_result_heading">TDEE required for goal :</div>
                <div className="sub_result_value">{Math.ceil(TDEERequire)} calories/day</div>
            </div>

            

            <div className="result">
                <div className="heading">Your Daily Energy Requirement :</div>
                <div className="value">
                    <div className="table">
                        <div className="thead">
                            <div className="th">Unit</div><div className="th">calories :</div><div className="th">gram :</div>
                        </div>
                        <div className="tbody" style={{textAlign:"center"}}>
                            <div className="td">Carb :</div><div className="td">{microNutrientRatio.carb} cal</div><div className="td">{microNutrientRatio.carb/4} gm</div>
                            <div className="td">Protein :</div><div className="td">{microNutrientRatio.protein} cal</div><div className="td">{microNutrientRatio.protein/4} gm</div>
                            <div className="td">Fat :</div><div className="td">{microNutrientRatio.fat} cal</div><div className="td">{microNutrientRatio.fat/4} gm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MacroCalculator;