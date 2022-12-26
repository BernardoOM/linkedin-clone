import React from "react"
import "./Widgets.css"
import InfoIcon from "@mui/icons-material/Info"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

function Widgets() {
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>
            {newsArticle("PAPA React is back", "Top news 9099 readers")}
            {newsArticle(
                "Argentina won the third World Cup",
                "Messi the best player of the world - 120M readers"
            )}
            {newsArticle("Bitcoin breaks $18k", "Crypto - 8500 readers")}
            {newsArticle("Is Redux too good?", "Top news - 1000 readers")}
            {newsArticle("PAPA react launches course?", "Top news - 6505 readers")}
        </div>
    )
}

export default Widgets
