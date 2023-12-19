import { FC } from "react"
import { Direction } from "../../enums/Direction.enum"
import {ReactComponent as TriangleArrow} from "../../assets/icons/triangle-arrow.svg"
import classNames from "classnames"
import { StyledCallButtons } from "./CallButtons.styled"

export type CallButtonsProps = {
    onCallButtonClicked: (direction: Direction) => void
}


export const CallButtons: FC<CallButtonsProps> = ({onCallButtonClicked}) => {

    const renderCallButton = (direction: Direction) => {
        return (
            <div className={classNames("button", {down: direction === Direction.DOWN})} onClick={() => onCallButtonClicked(direction)}>
                <TriangleArrow /> 
            </div>
        )
    }
    return (
        <StyledCallButtons className="call-buttons">
                {renderCallButton(Direction.UP)}
                {renderCallButton(Direction.DOWN)}
        </StyledCallButtons>
    )
}