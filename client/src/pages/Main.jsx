import React from 'react'
import '../Styles/Main.css'
import mainImg from '../static/img/MainImage.png'

const Main = () => {
    return (
        <div className='Main'>
            <div className="Main__container">
                <div className="Main__inner">
                    <div className="Main__text">
                        <h1>Main</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quod nesciunt eum velit non labore reiciendis, excepturi iusto soluta. Tempora repudiandae qui eius laborum dolorum error quod accusamus laudantium pariatur autem natus, accusantium harum? Ducimus aspernatur ex, harum recusandae temporibus quisquam debitis quibusdam, quos ut corporis consequatur sapiente architecto tenetur laudantium, nobis dolor voluptas! Eveniet nobis sunt laudantium quos ab beatae eligendi voluptatibus necessitatibus, quis fugit magni architecto repudiandae est ducimus cupiditate consequuntur optio reprehenderit ipsa, soluta harum impedit. Voluptatem porro accusantium, unde aliquid consequuntur quibusdam error delectus? Provident eligendi, labore atque dicta saepe eaque consequatur quod beatae velit sed.
                            blanditiis debitis maiores atque similique quos?
                        </p>

                    </div>
                    <div className='Main__img'>
                        <img src={mainImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main