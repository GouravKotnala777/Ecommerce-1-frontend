import { ChangeEvent } from "react";
import "../styles/components/form.scss";

interface FormPropTypes{
    heading:string;
    formFields:{type:string; name:string; placeHolder:string; options?:string[]}[];
    onChangeHandler:(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => void;
    onClickHandler:() => void;
}

const Form = ({heading, formFields, onChangeHandler, onClickHandler}:FormPropTypes) => {

    return(
        <div className="form_cont">
            <div className="heading_cont">
                {heading}
            </div>
            <div className="fields_cont">
                {
                    formFields.map((field, index) => (
                        field.type === "textArea" ?
                        <textarea key={index} rows={5} name={field.name} placeholder={field.placeHolder+"..."} onChange={(e) => onChangeHandler(e)} />
                        :
                        field.type === "select" ?
                            <select key={index} name={field.name} onChange={(e) => onChangeHandler(e)}>
                                <option unselectable="on" value="none">--select--</option>
                                {
                                    field.options?.map((option, optionInd) => (
                                        <option key={optionInd}>{option}</option>
                                    ))
                                }
                            </select>
                            :
                            <input key={index} type={field.type} name={field.name} placeholder={field.placeHolder} onChange={(e) => onChangeHandler(e)} />
                    ))
                }
                <button onClick={onClickHandler}>{heading}</button>
            </div>
        </div>
    )
};

export default Form;