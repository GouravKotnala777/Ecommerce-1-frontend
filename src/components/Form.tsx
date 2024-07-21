import { ChangeEvent } from "react";
import "../styles/components/form.scss";

export interface FormFieldTypes{
    type:string;
    name:string;
    placeHolder:string;
    options?:string[];
}

interface FormPropTypes{
    heading:string;
    formFields:FormFieldTypes[];
    onChangeHandler:(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => void;
    onClickHandler:() => void;
}

const Form = ({heading, formFields, onChangeHandler, onClickHandler}:FormPropTypes) => {

    return(
        <div className="form_cont" onClick={(e) => {e.stopPropagation()}}>
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
                                <option unselectable="on" value="none">--{field.placeHolder}--</option>
                                {
                                    field.options?.map((option, optionInd) => (
                                        <option key={optionInd} value={option.toLowerCase()} style={{background:option === "" ? "#f1f1f1":"unset"}} disabled={option === ""}>{option}</option>
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