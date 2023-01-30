const symbols = {

    circle: (color)=> ` <svg viewBox="0 0 120 120" fill='none' xmlns="http://www.w3.org/2000/svg">
    <path d="M102.5 60C102.5 83.4721 83.4721 102.5 60 102.5C36.5279 102.5 17.5 83.4721 17.5 60C17.5 36.5279 36.5279 17.5 60 17.5C83.4721 17.5 102.5 36.5279 102.5 60Z" stroke=${color} stroke-width="15"/>
    </svg>
    ` ,
    cross: (color)=> `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6067 9L9.00012 19.6066L49.2335 59.8399L9 100.073L19.6066 110.68L59.8401 70.4465L99.0735 109.68L109.68 99.0734L70.4467 59.8399L109.68 20.6066L99.0734 10L59.8401 49.2333L19.6067 9Z" fill=${color} />
    </svg>`
}