import React, { useState } from 'react'
import '../componentStyles/Rating.css'

function Rating({value,onRatingChange,disabled}){
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value||0);

    // handle star hover 
    const handleMouseEnter = (rating)=>{
        if(!disabled){
            setHoveredRating(rating)
        }
    }
    // mouse leave
    const handleMouseLeave = ()=>{
        if(!disabled){
            setHoveredRating(0)
        }
    }

    // handle click
    const handleClick = (rating)=>{
        if(!disabled){
            setHoveredRating(rating)
            if(onRatingChange){
                onRatingChange(rating)
            }
        }
    }

    // function to generate start based on the selected ratings 
    const generateStars = ()=>{
        const starts = [];
        for(let i = 1; i <= 5; i++){
            const isFilled = i<=(hoveredRating || selectedRating)
            starts.push(
                <span 
                key={i} className={`star ${isFilled ? 'filled' : 'empty'}`}
                onMouseEnter={()=>handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={()=>handleClick(i)}
                style={{pointerEvents:disabled ? 'none':'auto'}}
                >★</span>
            )
        }
        return starts;
    }


  return (
    <div>
        <div className="rating">{generateStars()}</div>
    </div>
  )
}

export default Rating