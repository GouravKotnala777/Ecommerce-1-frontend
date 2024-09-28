import "../styles/components/tab.scss";
import { ReactElement, useState } from "react";
import { PRIMARY, SECONDARY } from "../styles/utils";

interface PaneslArrayTypes{
    name:string;
    children:ReactElement;
}

const Tab = ({panelsArray}:{panelsArray:PaneslArrayTypes[]}) => {
    const [selectedTab, setSelectedTab] = useState<string>("");

    return(
        <div className="tab_panel">
            <div className="tabs_cont">
                {
                    panelsArray.map((item) => (
                        <button className="tab" value={item.name} style={{
                            background:item.name === selectedTab ? `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})` : "white",
                            color:item.name === selectedTab ? "white" : "black",
                            boxShadow:item.name === selectedTab ? "0px 0px 3px 1px rgba(0,0,0,0.3) inset" : "0px 0px 5px 1px rgba(0,0,0,0.3)"
                        }} onClick={(e) => setSelectedTab(e.currentTarget.value)}>{item.name}</button>
                    ))
                }
                
            </div>
            <div className="panel_cont">
                {
                    panelsArray.map((item) => (
                        item.name === selectedTab &&
                        <>
                            {item.children}
                        </>
                    ))
                }
            </div>
        </div>
    )
};

export default Tab;