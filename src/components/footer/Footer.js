import './footer.css'

export function Footer({ mainTheme }) {
    return (
        <footer className={`footer-container footer-${mainTheme}`}>
            <p>Alexander Zelenkov</p>
            <p>
                <a href='https://github.com/SashaZel/' target="_blank" rel="noreferrer" className='footer-link'>GitHub</a>
                <a href='mailto:lll555@yandex.ru' target="_blank" rel="noreferrer" className='footer-link'>@mail</a>
                <a href='https://vk.com/id332810932' target="_blank" rel="noreferrer" className='footer-link'>VK</a>
            </p>
        </footer>
    );
}