import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useOnClickOutside } from '../lib/useOnClickOutside'

const Nav = (props) => {
    let ref = React.useRef()

    useOnClickOutside(ref, () => props.setIsBurger(false))

    return (
        <StyledNav isBurger={props.isBurger} ref={ref}>
            <Top>
                <NavLink to="/">
                    <Logo>
                        <img src="/images/primary/Logo.png" alt="" />
                        <p>BorB</p>
                    </Logo>
                </NavLink>
                <Block>
                    <Title>MANAGEMENTS</Title>
                    <NavLink to="/" className="colored">
                        <StyledLink>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.3337 10H15.0003L12.5003 17.5L7.50033 2.5L5.00033 10H1.66699"
                                    stroke="#8A8F99"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>Trade</p>
                        </StyledLink>
                    </NavLink>
                    <NavLink
                        className="need"
                        to="/earn"
                        onClick={() => props.isBurger(false)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.9998 0.299805C10.3864 0.299805 10.6998 0.613205 10.6998 0.999805V3.46649H14.1665C14.5531 3.46649 14.8665 3.77989 14.8665 4.16649C14.8665 4.55309 14.5531 4.86649 14.1665 4.86649H7.91647C7.32857 4.86649 6.76476 5.10003 6.34905 5.51574C5.93335 5.93144 5.6998 6.49526 5.6998 7.08316C5.6998 7.67105 5.93335 8.23487 6.34905 8.65058C6.76476 9.06628 7.32857 9.29982 7.91647 9.29982H12.0831C13.0423 9.29982 13.9623 9.68087 14.6405 10.3591C15.3188 11.0374 15.6998 11.9573 15.6998 12.9165C15.6998 13.8757 15.3188 14.7956 14.6405 15.4739C13.9623 16.1521 13.0423 16.5332 12.0831 16.5332H10.6998L10.6998 18.9998C10.6998 19.3864 10.3864 19.6998 9.9998 19.6998C9.61321 19.6998 9.2998 19.3864 9.2998 18.9998V16.5332H4.9998C4.61321 16.5332 4.2998 16.2198 4.2998 15.8332C4.2998 15.4466 4.61321 15.1332 4.9998 15.1332H12.0831C12.671 15.1332 13.2349 14.8996 13.6506 14.4839C14.0663 14.0682 14.2998 13.5044 14.2998 12.9165C14.2998 12.3286 14.0663 11.7648 13.6506 11.3491C13.2349 10.9334 12.671 10.6998 12.0831 10.6998H7.91647C6.95727 10.6998 6.03736 10.3188 5.3591 9.64053C4.68085 8.96227 4.2998 8.04236 4.2998 7.08316C4.2998 6.12396 4.68085 5.20405 5.3591 4.52579C6.03736 3.84753 6.95727 3.46649 7.91647 3.46649H9.2998L9.2998 0.999805C9.2998 0.613205 9.61321 0.299805 9.9998 0.299805Z"
                                fill="var(--grey60)"
                            />
                        </svg>

                        <p>Earn</p>
                    </NavLink>
                    <NavLink
                        className="need"
                        to="/supply"
                        onClick={() => props.isBurger(false)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.9998 1.2998C9.81415 1.2998 9.63611 1.37355 9.50483 1.50483C9.37355 1.63611 9.2998 1.81415 9.2998 1.9998V9.9998C9.2998 10.3864 9.6132 10.6998 9.9998 10.6998H17.9998C18.3864 10.6998 18.6998 10.3864 18.6998 9.9998C18.6998 8.8573 18.4748 7.72599 18.0376 6.67046C17.6003 5.61493 16.9595 4.65585 16.1516 3.84798C15.3438 3.04011 14.3847 2.39927 13.3292 1.96205C12.2736 1.52484 11.1423 1.2998 9.9998 1.2998ZM10.6998 9.2998V2.73344C11.4184 2.80267 12.1241 2.97823 12.7934 3.25548C13.6791 3.62234 14.4838 4.16006 15.1617 4.83793C15.8396 5.51579 16.3773 6.32054 16.7441 7.20622C17.0214 7.87556 17.1969 8.58122 17.2662 9.2998H10.6998ZM6.96561 3.64114C7.3198 3.48621 7.48134 3.07348 7.32641 2.71928C7.17148 2.36508 6.75875 2.20354 6.40456 2.35847C5.13063 2.9157 4.01245 3.77717 3.14768 4.86742C2.28292 5.95766 1.69787 7.2435 1.44354 8.6125C1.18921 9.98149 1.27331 11.3921 1.68853 12.721C2.10374 14.0499 2.83746 15.2569 3.82569 16.2362C4.81392 17.2155 6.02659 17.9374 7.35773 18.3385C8.68887 18.7397 10.0978 18.808 11.4614 18.5373C12.825 18.2666 14.1015 17.6652 15.1794 16.7859C16.2572 15.9066 17.1037 14.7761 17.6448 13.4935C17.795 13.1373 17.6281 12.7267 17.2719 12.5764C16.9157 12.4262 16.5051 12.5931 16.3548 12.9493C15.9025 14.0216 15.195 14.9664 14.2944 15.7011C13.3938 16.4358 12.3275 16.938 11.1888 17.1641C10.0501 17.3901 8.87343 17.3332 7.76172 16.9981C6.65 16.663 5.63692 16.0601 4.81113 15.2417C3.98534 14.4234 3.37197 13.4146 3.02482 12.3035C2.67766 11.1924 2.60733 10.0129 2.81999 8.86821C3.03265 7.72352 3.5218 6.64861 4.24454 5.73743C4.96727 4.82625 5.90155 4.10656 6.96561 3.64114Z"
                                fill="#8A8F99"
                            />
                        </svg>

                        <p>Supply</p>
                    </NavLink>
                </Block>
                <Block>
                    <Title>Support</Title>
                    <NavLink
                        className="need"
                        to="/messages"
                        onClick={() => props.isBurger(false)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.42368 4.67531C2.55836 4.30276 2.9171 4.0333 3.33352 4.0333H16.6669C17.0833 4.0333 17.442 4.30276 17.5767 4.67531L10.0002 9.97886L2.42368 4.67531ZM0.966886 4.9882C0.966778 4.99499 0.966768 5.00178 0.966857 5.00856V15C0.966857 16.3032 2.03026 17.3666 3.33352 17.3666H16.6669C17.9701 17.3666 19.0335 16.3032 19.0335 15V5.00851M17.6335 6.34445V15C17.6335 15.53 17.1969 15.9666 16.6669 15.9666H3.33352C2.80346 15.9666 2.36686 15.53 2.36686 15V6.34445L9.59877 11.4068C9.83979 11.5755 10.1606 11.5755 10.4016 11.4068L17.6335 6.34445ZM19.0335 4.98826C19.0271 3.69034 17.9662 2.6333 16.6669 2.6333H3.33352C2.03418 2.6333 0.973264 3.69031 0.966886 4.9882"
                                fill="#8A8F99"
                            />
                        </svg>

                        <p>Messages</p>
                    </NavLink>
                    <NavLink
                        className="need"
                        to="/settings"
                        onClick={() => props.isBurger(false)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_208_528)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.31594 1.81643C9.49723 1.63515 9.7431 1.5333 9.99948 1.5333C10.2559 1.5333 10.5017 1.63515 10.683 1.81643C10.8643 1.99772 10.9661 2.24359 10.9661 2.49997V2.57497L10.9662 2.57776C10.9678 2.98243 11.0877 3.3778 11.3111 3.71519C11.5339 4.05153 11.8498 4.31563 12.2202 4.4752C12.5987 4.6414 13.0181 4.69082 13.4249 4.61707C13.8328 4.5431 14.2092 4.34862 14.5056 4.0587L14.5057 4.05873L14.5111 4.05327L14.5611 4.00327L14.5614 4.003C14.6512 3.91312 14.7578 3.84182 14.8751 3.79318C14.9925 3.74453 15.1183 3.71949 15.2453 3.71949C15.3723 3.71949 15.4981 3.74453 15.6155 3.79318C15.7328 3.84182 15.8394 3.91312 15.9292 4.003L15.9298 4.00355C16.0197 4.09333 16.091 4.19994 16.1396 4.31729C16.1882 4.43464 16.2133 4.56043 16.2133 4.68747C16.2133 4.8145 16.1882 4.94029 16.1396 5.05764C16.091 5.17499 16.0197 5.28161 15.9298 5.37138L15.9295 5.37166L15.8795 5.42166L15.8795 5.42163L15.8741 5.42715C15.5842 5.72353 15.3897 6.09997 15.3157 6.50792C15.2506 6.86679 15.2814 7.23557 15.4038 7.57733C15.4113 7.64553 15.4289 7.71239 15.4561 7.77572C15.6155 8.14767 15.8802 8.46489 16.2176 8.68833C16.555 8.91177 16.9503 9.03168 17.355 9.03329L17.3578 9.0333H17.4995C17.7559 9.0333 18.0017 9.13515 18.183 9.31643C18.3643 9.49772 18.4661 9.74359 18.4661 9.99997C18.4661 10.2563 18.3643 10.5022 18.183 10.6835C18.0017 10.8648 17.7559 10.9666 17.4995 10.9666L17.4245 10.9666L17.4217 10.9666C17.017 10.9683 16.6216 11.0882 16.2843 11.3116C15.9479 11.5343 15.6838 11.8502 15.5243 12.2207C15.358 12.5991 15.3086 13.0186 15.3824 13.4253C15.4563 13.8333 15.6508 14.2097 15.9407 14.5061L15.9407 14.5061L15.9462 14.5116L15.9962 14.5616L15.9964 14.5619C16.0863 14.6517 16.1576 14.7583 16.2063 14.8756C16.2549 14.993 16.28 15.1188 16.28 15.2458C16.28 15.3728 16.2549 15.4986 16.2063 15.616C16.1576 15.7333 16.0863 15.8399 15.9964 15.9297L15.9959 15.9303C15.9061 16.0201 15.7995 16.0914 15.6822 16.1401C15.5648 16.1887 15.439 16.2138 15.312 16.2138C15.1849 16.2138 15.0592 16.1887 14.9418 16.1401C14.8245 16.0914 14.7178 16.0201 14.6281 15.9303L14.6278 15.93L14.5778 15.88L14.5778 15.88L14.5723 15.8746C14.2759 15.5846 13.8995 15.3902 13.4915 15.3162C13.0848 15.2424 12.6653 15.2919 12.2868 15.4581C11.9164 15.6177 11.6005 15.8818 11.3778 16.2181C11.1543 16.5555 11.0344 16.9508 11.0328 17.3555L11.0328 17.3583V17.5C11.0328 17.7563 10.931 18.0022 10.7497 18.1835C10.5684 18.3648 10.3225 18.4666 10.0661 18.4666C9.80977 18.4666 9.56389 18.3648 9.38261 18.1835C9.20132 18.0022 9.09948 17.7563 9.09948 17.5V17.425L9.09929 17.4086C9.08955 16.9923 8.95481 16.5887 8.7126 16.25C8.47467 15.9173 8.14385 15.6625 7.76184 15.5174C7.38785 15.3571 6.9748 15.3102 6.5741 15.3829C6.16615 15.4568 5.78971 15.6513 5.49333 15.9412L5.4933 15.9412L5.48783 15.9467L5.43783 15.9967L5.43756 15.9969C5.34779 16.0868 5.24117 16.1581 5.12382 16.2068C5.00647 16.2554 4.88068 16.2804 4.75365 16.2804C4.62661 16.2804 4.50082 16.2554 4.38347 16.2068C4.26612 16.1581 4.1595 16.0868 4.06973 15.9969L4.06918 15.9964C3.9793 15.9066 3.908 15.8 3.85935 15.6826C3.81071 15.5653 3.78567 15.4395 3.78567 15.3125C3.78567 15.1854 3.81071 15.0596 3.85935 14.9423C3.908 14.8249 3.9793 14.7183 4.06918 14.6285L4.06945 14.6283L4.11945 14.5783L4.11948 14.5783L4.12488 14.5728C4.4148 14.2764 4.60928 13.9 4.68325 13.492C4.757 13.0853 4.70758 12.6658 4.54138 12.2874C4.3818 11.9169 4.11771 11.601 3.78137 11.3783C3.44398 11.1548 3.04861 11.0349 2.64394 11.0333H2.64115H2.49948C2.2431 11.0333 1.99723 10.9315 1.81594 10.7502C1.63466 10.5689 1.53281 10.323 1.53281 10.0666C1.53281 9.81026 1.63466 9.56438 1.81594 9.3831C1.99723 9.20181 2.2431 9.09997 2.49948 9.09997H2.57448L2.59085 9.09978C3.0071 9.09004 3.41079 8.9553 3.74945 8.71308C4.08211 8.47516 4.3369 8.14433 4.48204 7.76232C4.64236 7.38833 4.68924 6.97528 4.61659 6.57459C4.54262 6.16664 4.34813 5.7902 4.05822 5.49381L4.05825 5.49378L4.05279 5.48833L4.00279 5.43833L4.00251 5.43805C3.91263 5.34827 3.84133 5.24166 3.79269 5.12431C3.74404 5.00696 3.719 4.88117 3.719 4.75413C3.719 4.6271 3.74404 4.50131 3.79269 4.38396C3.84133 4.26661 3.91263 4.15999 4.00251 4.07022L4.00306 4.06967C4.09284 3.97979 4.19945 3.90849 4.3168 3.85984C4.43415 3.8112 4.55994 3.78616 4.68698 3.78616C4.81401 3.78616 4.9398 3.8112 5.05715 3.85984C5.17451 3.90849 5.28112 3.97979 5.37089 4.06967L5.37117 4.06994L5.42117 4.11994L5.42114 4.11997L5.42666 4.12537C5.72304 4.41529 6.09948 4.60977 6.50743 4.68374C6.86631 4.74881 7.23509 4.718 7.57684 4.59568C7.64504 4.5881 7.7119 4.57051 7.77523 4.54337C8.14718 4.38395 8.4644 4.11925 8.68784 3.78186C8.91128 3.44446 9.03119 3.0491 9.03281 2.64443L9.03281 2.64163V2.49997C9.03281 2.24359 9.13466 1.99772 9.31594 1.81643ZM16.8065 12.7826L16.1661 12.5L16.8095 12.7757C16.8614 12.6547 16.9475 12.5515 17.0573 12.4788C17.1667 12.4063 17.295 12.3674 17.4263 12.3666H17.4995C18.1272 12.3666 18.7291 12.1173 19.173 11.6735C19.6168 11.2296 19.8661 10.6276 19.8661 9.99997C19.8661 9.37229 19.6168 8.77032 19.173 8.32648C18.7291 7.88265 18.1272 7.6333 17.4995 7.6333H17.3594C17.2282 7.63255 17.1 7.59356 16.9906 7.52109C16.9088 7.46695 16.8402 7.39589 16.7891 7.31315C16.7794 7.25734 16.7629 7.20277 16.7399 7.15066C16.6854 7.02728 16.6692 6.8904 16.6932 6.7577C16.7171 6.62604 16.7796 6.50448 16.8726 6.40842L16.9192 6.36188L16.9195 6.36161C17.1394 6.14187 17.3138 5.88095 17.4329 5.59376C17.552 5.30645 17.6133 4.99848 17.6133 4.68747C17.6133 4.37645 17.552 4.06848 17.4329 3.78118C17.3139 3.49411 17.1395 3.23329 16.9197 3.0136C16.6999 2.79356 16.4389 2.61899 16.1516 2.49989C15.8643 2.38079 15.5563 2.31949 15.2453 2.31949C14.9343 2.31949 14.6263 2.38079 14.339 2.49989C14.0517 2.61899 13.7907 2.79356 13.5709 3.0136L13.5244 3.06012C13.4283 3.1532 13.3067 3.21566 13.1751 3.23953C13.0424 3.2636 12.9055 3.24735 12.7821 3.1929L12.7821 3.19286L12.7752 3.1899C12.6542 3.13805 12.551 3.05194 12.4784 2.94218C12.4059 2.83271 12.3669 2.70447 12.3661 2.57318V2.49997C12.3661 1.87229 12.1168 1.27032 11.673 0.826481C11.2291 0.382645 10.6272 0.133301 9.99948 0.133301C9.3718 0.133301 8.76983 0.382645 8.32599 0.826481C7.88216 1.27032 7.63281 1.87229 7.63281 2.49997V2.64002C7.63206 2.77125 7.59307 2.89942 7.5206 3.00885C7.46646 3.0906 7.3954 3.15923 7.31267 3.21035C7.25685 3.22008 7.20228 3.23657 7.15018 3.25956C7.02679 3.31402 6.88991 3.33026 6.75721 3.3062C6.62555 3.28233 6.50397 3.21987 6.40791 3.12679L6.36139 3.08027L6.36115 3.08002L6.36112 3.07999C6.14138 2.86008 5.88046 2.68561 5.59327 2.56656C5.30596 2.44746 4.998 2.38616 4.68698 2.38616C4.37596 2.38616 4.068 2.44746 3.78069 2.56656C3.4935 2.68561 3.23258 2.86008 3.01284 3.07999C2.79292 3.29973 2.61846 3.56065 2.4994 3.84784C2.3803 4.13515 2.319 4.44312 2.319 4.75413C2.319 5.06515 2.3803 5.37312 2.4994 5.66043C2.61846 5.94761 2.79292 6.20853 3.01284 6.42827L3.01311 6.42855L3.05963 6.47507C3.15271 6.57113 3.21517 6.6927 3.23905 6.82436C3.26311 6.95707 3.24686 7.09394 3.19241 7.21733C3.18645 7.23082 3.18093 7.2445 3.17584 7.25834C3.12908 7.38546 3.04517 7.49557 2.935 7.57437C2.82667 7.65185 2.69788 7.69552 2.56486 7.69997H2.49948C1.8718 7.69997 1.26983 7.94931 0.825993 8.39315C0.382157 8.83698 0.132812 9.43895 0.132812 10.0666C0.132812 10.6943 0.382157 11.2963 0.825993 11.7401C1.26983 12.184 1.8718 12.4333 2.49948 12.4333H2.63936C2.77065 12.434 2.89889 12.473 3.00836 12.5455C3.11812 12.6182 3.20422 12.7214 3.25608 12.8424L3.25604 12.8424L3.25907 12.8493C3.31353 12.9727 3.32978 13.1095 3.30571 13.2422C3.28184 13.3739 3.21938 13.4955 3.1263 13.5915L3.07978 13.638C2.85973 13.8578 2.68517 14.1189 2.56607 14.4062C2.44697 14.6935 2.38567 15.0014 2.38567 15.3125C2.38567 15.6235 2.44697 15.9314 2.56607 16.2188C2.68517 16.5061 2.85973 16.7671 3.07978 16.9869C3.29947 17.2067 3.56029 17.381 3.84735 17.5C4.13466 17.6191 4.44263 17.6804 4.75365 17.6804C5.06466 17.6804 5.37263 17.6191 5.65994 17.5C5.94724 17.3809 6.20826 17.2064 6.42806 16.9863L6.47455 16.9398C6.57061 16.8467 6.6922 16.7843 6.82387 16.7604C6.95658 16.7363 7.09345 16.7526 7.21684 16.807C7.23033 16.813 7.24401 16.8185 7.25785 16.8236C7.38497 16.8704 7.49508 16.9543 7.57388 17.0644C7.65136 17.1728 7.69503 17.3016 7.69948 17.4346V17.5C7.69948 18.1276 7.94882 18.7296 8.39266 19.1735C8.83649 19.6173 9.43847 19.8666 10.0661 19.8666C10.6938 19.8666 11.2958 19.6173 11.7396 19.1735C12.1835 18.7296 12.4328 18.1276 12.4328 17.5V17.3601C12.4335 17.2288 12.4725 17.1006 12.545 16.9911C12.6177 16.8813 12.7209 16.7952 12.8419 16.7434L12.8419 16.7434L12.8488 16.7404C12.9722 16.6859 13.109 16.6697 13.2417 16.6937C13.3734 16.7176 13.495 16.7801 13.591 16.8731L13.6376 16.9197L13.6378 16.9199C13.8576 17.1399 14.1185 17.3143 14.4057 17.4334C14.693 17.5525 15.001 17.6138 15.312 17.6138C15.623 17.6138 15.931 17.5525 16.2183 17.4334C16.5055 17.3143 16.7664 17.1399 16.9861 16.9199C17.206 16.7002 17.3805 16.4393 17.4996 16.1521C17.6187 15.8648 17.68 15.5568 17.68 15.2458C17.68 14.9348 17.6187 14.6268 17.4996 14.3395C17.3805 14.0522 17.2059 13.7912 16.9858 13.5714L16.9393 13.5249C16.8462 13.4288 16.7838 13.3072 16.7599 13.1756C16.7358 13.0429 16.7521 12.906 16.8065 12.7826ZM8.19956 9.99999C8.19956 9.00587 9.00545 8.19999 9.99956 8.19999C10.9937 8.19999 11.7996 9.00587 11.7996 9.99999C11.7996 10.9941 10.9937 11.8 9.99956 11.8C9.00545 11.8 8.19956 10.9941 8.19956 9.99999ZM9.99956 6.79999C8.23225 6.79999 6.79956 8.23268 6.79956 9.99999C6.79956 11.7673 8.23225 13.2 9.99956 13.2C11.7669 13.2 13.1996 11.7673 13.1996 9.99999C13.1996 8.23268 11.7669 6.79999 9.99956 6.79999Z"
                                    fill="#8A8F99"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_208_528">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <p>Settings</p>
                    </NavLink>
                </Block>
                <Block>
                    <Title>About</Title>
                    <StyledLink stroke="true">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.833 1.6665H4.99967C4.55765 1.6665 4.13372 1.8421 3.82116 2.15466C3.5086 2.46722 3.33301 2.89114 3.33301 3.33317V16.6665C3.33301 17.1085 3.5086 17.5325 3.82116 17.845C4.13372 18.1576 4.55765 18.3332 4.99967 18.3332H14.9997C15.4417 18.3332 15.8656 18.1576 16.1782 17.845C16.4907 17.5325 16.6663 17.1085 16.6663 16.6665V7.49984L10.833 1.6665Z"
                                stroke="#8A8F99"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10.833 1.6665V7.49984H16.6663"
                                stroke="#8A8F99"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <p>Docs</p>
                    </StyledLink>
                    <StyledLink>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.95 10.6974V2.60284C2.95038 2.60084 2.95176 2.59468 2.95615 2.58456C2.96385 2.56678 2.97713 2.54566 2.9951 2.5263C3.00675 2.51374 3.01722 2.5053 3.02475 2.5001H16.9753C16.9828 2.5053 16.9932 2.51374 17.0049 2.52629C17.0229 2.54566 17.0362 2.56678 17.0439 2.58456C17.0482 2.59467 17.0496 2.60084 17.05 2.60283V10.6272C17.0216 10.7428 16.986 10.7833 16.9797 10.7896L16.9785 10.7907C16.9773 10.7918 16.9768 10.792 16.9756 10.7925L16.9752 10.7926C16.9721 10.7938 16.9547 10.8001 16.9147 10.8001H3.02475C3.01722 10.7949 3.00675 10.7865 2.9951 10.7739C2.97713 10.7545 2.96385 10.7334 2.95615 10.7156C2.95176 10.7055 2.95038 10.6994 2.95 10.6974ZM2.99251 1.1001C2.56013 1.1001 2.20051 1.32444 1.96897 1.5739C1.73427 1.82677 1.55 2.19025 1.55 2.6001V10.7001C1.55 11.1099 1.73427 11.4734 1.96897 11.7263C2.20051 11.9758 2.56013 12.2001 2.99251 12.2001H16.9147C17.31 12.2001 17.6791 12.0665 17.9634 11.7856C18.2347 11.5178 18.3748 11.1698 18.4382 10.8279C18.4461 10.7857 18.45 10.743 18.45 10.7001V2.6001C18.45 2.19025 18.2657 1.82677 18.031 1.5739C17.7995 1.32444 17.4399 1.1001 17.0075 1.1001H2.99251ZM9.00078 6.70006C9.00078 6.14778 9.4485 5.70006 10.0008 5.70006C10.5531 5.70006 11.0008 6.14778 11.0008 6.70006C11.0008 7.25235 10.5531 7.70006 10.0008 7.70006C9.4485 7.70006 9.00078 7.25235 9.00078 6.70006ZM10.0008 4.30006C8.6753 4.30006 7.60078 5.37458 7.60078 6.70006C7.60078 8.02554 8.6753 9.10006 10.0008 9.10006C11.3263 9.10006 12.4008 8.02554 12.4008 6.70006C12.4008 5.37458 11.3263 4.30006 10.0008 4.30006ZM5.00068 7.4009C5.38776 7.4009 5.70155 7.0871 5.70155 6.70002C5.70155 6.31294 5.38776 5.99915 5.00068 5.99915C4.6136 5.99915 4.2998 6.31294 4.2998 6.70002C4.2998 7.0871 4.6136 7.4009 5.00068 7.4009ZM15.7001 6.70001C15.7001 7.08641 15.3868 7.39965 15.0004 7.39965C14.614 7.39965 14.3008 7.08641 14.3008 6.70001C14.3008 6.31361 14.614 6.00037 15.0004 6.00037C15.3868 6.00037 15.7001 6.31361 15.7001 6.70001ZM1.55 14.9001C1.55 14.5135 1.8634 14.2001 2.25 14.2001H17.75C18.1366 14.2001 18.45 14.5135 18.45 14.9001C18.45 15.2867 18.1366 15.6001 17.75 15.6001H2.25C1.8634 15.6001 1.55 15.2867 1.55 14.9001ZM2.1248 17.6C1.73821 17.6 1.4248 17.9135 1.4248 18.3C1.4248 18.6866 1.73821 19 2.1248 19H17.6248C18.0114 19 18.3248 18.6866 18.3248 18.3C18.3248 17.9135 18.0114 17.6 17.6248 17.6H2.1248Z"
                                fill="#8A8F99"
                            />
                        </svg>

                        <p>Price feed</p>
                    </StyledLink>
                </Block>
            </Top>
            <Language
                onClick={() => {
                    props.set(true)
                    props.setIsBurger(false)
                }}
            >
                <img src="/images/primary/language.svg" alt="" />
                <p>English</p>
                <img src="/images/primary/arrow2.svg" alt="" />
            </Language>
            <Bottom>
                <Icons>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 0C4.47768 0 0 4.47768 0 10C0 15.5223 4.47768 20 10 20C15.5223 20 20 15.5223 20 10C20 4.47768 15.5223 0 10 0ZM14.8058 7.53795C14.8125 7.64286 14.8125 7.75223 14.8125 7.85938C14.8125 11.1362 12.317 14.9107 7.7567 14.9107C6.35045 14.9107 5.04688 14.5022 3.94866 13.7991C4.14955 13.8214 4.34152 13.8304 4.54688 13.8304C5.70759 13.8304 6.77455 13.4375 7.625 12.7723C6.53571 12.75 5.62054 12.0357 5.30804 11.0536C5.68973 11.1094 6.03348 11.1094 6.42634 11.0089C5.86546 10.895 5.36133 10.5904 4.99959 10.1468C4.63785 9.70331 4.44082 9.14823 4.44196 8.57589V8.54464C4.77009 8.72991 5.15625 8.84375 5.56027 8.85938C5.22063 8.63302 4.94209 8.32636 4.74936 7.96658C4.55662 7.60681 4.45563 7.20503 4.45536 6.79688C4.45536 6.33482 4.57589 5.91295 4.79241 5.54688C5.41496 6.31325 6.19181 6.94005 7.07247 7.38653C7.95312 7.83301 8.91788 8.08918 9.90402 8.13839C9.55357 6.45313 10.8125 5.08929 12.3259 5.08929C13.0402 5.08929 13.683 5.38839 14.1362 5.87054C14.6964 5.76562 15.2321 5.5558 15.7098 5.27455C15.5246 5.84821 15.1362 6.33259 14.6205 6.63839C15.1205 6.58482 15.6027 6.44643 16.0491 6.25223C15.7121 6.74777 15.2902 7.1875 14.8058 7.53795Z"
                            fill="#C2C5CC"
                        />
                    </svg>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_173_758)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 0C4.475 0 0 4.475 0 10C0 14.425 2.8625 18.1625 6.8375 19.4875C7.3375 19.575 7.525 19.275 7.525 19.0125C7.525 18.775 7.5125 17.9875 7.5125 17.15C5 17.6125 4.35 16.5375 4.15 15.975C4.0375 15.6875 3.55 14.8 3.125 14.5625C2.775 14.375 2.275 13.9125 3.1125 13.9C3.9 13.8875 4.4625 14.625 4.65 14.925C5.55 16.4375 6.9875 16.0125 7.5625 15.75C7.65 15.1 7.9125 14.6625 8.2 14.4125C5.975 14.1625 3.65 13.3 3.65 9.475C3.65 8.3875 4.0375 7.4875 4.675 6.7875C4.575 6.5375 4.225 5.5125 4.775 4.1375C4.775 4.1375 5.6125 3.875 7.525 5.1625C8.325 4.9375 9.175 4.825 10.025 4.825C10.875 4.825 11.725 4.9375 12.525 5.1625C14.4375 3.8625 15.275 4.1375 15.275 4.1375C15.825 5.5125 15.475 6.5375 15.375 6.7875C16.0125 7.4875 16.4 8.375 16.4 9.475C16.4 13.3125 14.0625 14.1625 11.8375 14.4125C12.2 14.725 12.5125 15.325 12.5125 16.2625C12.5125 17.6 12.5 18.675 12.5 19.0125C12.5 19.275 12.6875 19.5875 13.1875 19.4875C15.1727 18.8173 16.8977 17.5415 18.1198 15.8395C19.3419 14.1376 19.9995 12.0953 20 10C20 4.475 15.525 0 10 0Z"
                                fill="#C2C5CC"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_173_758">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_173_757)">
                            <path
                                d="M6.83861 10.4444C6.72873 10.6089 6.67008 10.8022 6.67008 11C6.67008 11.1313 6.69595 11.2614 6.7462 11.3827C6.79646 11.504 6.87012 11.6142 6.96298 11.7071C7.05584 11.8 7.16608 11.8736 7.2874 11.9239C7.40873 11.9741 7.53876 12 7.67008 12C7.86787 12 8.06121 11.9413 8.22565 11.8315C8.3901 11.7216 8.51828 11.5654 8.59396 11.3827C8.66965 11.2 8.68946 10.9989 8.65087 10.8049C8.61228 10.6109 8.51704 10.4327 8.37719 10.2929C8.23734 10.153 8.05916 10.0578 7.86517 10.0192C7.67119 9.98063 7.47013 10.0004 7.2874 10.0761C7.10468 10.1518 6.9485 10.28 6.83861 10.4444Z"
                                fill="#C2C5CC"
                            />
                            <path
                                d="M10.0101 14.52C10.8977 14.5568 11.7706 14.2847 12.4801 13.75V13.79C12.5063 13.7644 12.5273 13.7339 12.5418 13.7002C12.5562 13.6664 12.5639 13.6302 12.5644 13.5935C12.5649 13.5569 12.5581 13.5204 12.5445 13.4864C12.5309 13.4523 12.5107 13.4213 12.4851 13.395C12.4595 13.3687 12.4289 13.3478 12.3952 13.3333C12.3615 13.3188 12.3253 13.3112 12.2886 13.3107C12.2145 13.3098 12.1431 13.3383 12.0901 13.39C11.4832 13.8254 10.7459 14.0406 10.0001 14C9.2552 14.0333 8.52131 13.811 7.92008 13.37C7.86827 13.3275 7.8025 13.3057 7.73555 13.309C7.6686 13.3123 7.60527 13.3404 7.55787 13.3878C7.51048 13.4352 7.48241 13.4985 7.47912 13.5655C7.47583 13.6324 7.49756 13.6982 7.54008 13.75C8.24956 14.2847 9.12247 14.5568 10.0101 14.52Z"
                                fill="#C2C5CC"
                            />
                            <path
                                d="M11.7445 11.8715C11.909 11.9813 12.1023 12.04 12.3001 12.04L12.2901 12.08C12.4257 12.0815 12.5602 12.0553 12.6853 12.0032C12.8105 11.9511 12.9238 11.874 13.0183 11.7767C13.1127 11.6795 13.1864 11.564 13.2349 11.4373C13.2833 11.3107 13.3055 11.1755 13.3001 11.04C13.3001 10.8422 13.2414 10.6489 13.1316 10.4844C13.0217 10.32 12.8655 10.1918 12.6828 10.1161C12.5 10.0404 12.299 10.0206 12.105 10.0592C11.911 10.0978 11.7328 10.193 11.593 10.3329C11.4531 10.4727 11.3579 10.6509 11.3193 10.8449C11.2807 11.0389 11.3005 11.24 11.3762 11.4227C11.4519 11.6054 11.5801 11.7616 11.7445 11.8715Z"
                                fill="#C2C5CC"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM16.4066 9.21537C16.5683 9.44602 16.6598 9.71852 16.6701 10C16.6743 10.2755 16.6005 10.5466 16.4572 10.782C16.3139 11.0174 16.1069 11.2073 15.8601 11.33C15.8713 11.4764 15.8713 11.6235 15.8601 11.77C15.8601 14.01 13.2501 15.83 10.0301 15.83C6.81008 15.83 4.20008 14.01 4.20008 11.77C4.18882 11.6235 4.18882 11.4764 4.20008 11.33C4.00774 11.2416 3.83692 11.1125 3.69945 10.9515C3.56197 10.7906 3.46114 10.6017 3.40394 10.3979C3.34673 10.1941 3.33453 9.9803 3.36816 9.77132C3.4018 9.56234 3.48047 9.36317 3.59873 9.18762C3.71699 9.01207 3.872 8.86433 4.05303 8.75464C4.23407 8.64495 4.43678 8.57594 4.64714 8.55239C4.85749 8.52883 5.07045 8.5513 5.27126 8.61823C5.47207 8.68516 5.65593 8.79495 5.81008 8.94C6.96236 8.15852 8.31797 7.73099 9.71008 7.71L10.4501 4.24C10.4584 4.19983 10.4746 4.16171 10.4977 4.12784C10.5209 4.09398 10.5505 4.06504 10.585 4.04272C10.6194 4.0204 10.6579 4.00513 10.6982 3.99779C10.7386 3.99046 10.78 3.99121 10.8201 4L13.2701 4.49C13.3897 4.28444 13.5787 4.12825 13.8032 4.04948C14.0276 3.9707 14.2727 3.9745 14.4946 4.06018C14.7165 4.14587 14.9006 4.30784 15.0138 4.517C15.127 4.72617 15.162 4.96885 15.1124 5.20147C15.0628 5.4341 14.9319 5.64143 14.7433 5.78626C14.5546 5.9311 14.3205 6.00394 14.083 5.99172C13.8454 5.9795 13.62 5.88301 13.4472 5.71958C13.2744 5.55615 13.1655 5.33648 13.1401 5.1L11.0001 4.65L10.3501 7.77C11.7253 7.7995 13.0625 8.22671 14.2001 9C14.4033 8.80496 14.6586 8.67286 14.9352 8.61964C15.2118 8.56642 15.4979 8.59434 15.759 8.70004C16.02 8.80575 16.245 8.98471 16.4066 9.21537Z"
                                fill="#C2C5CC"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_173_757">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Icons>

                <Row>
                    <BottomText>© 2022 BorB</BottomText>
                    <Line />
                    <BottomLink>Privacy Policy</BottomLink>
                </Row>
            </Bottom>
        </StyledNav>
    )
}

export default Nav

const Language = styled.div`
    display: none;
    @media screen and (max-width: 1280px) {
        display: flex;
        align-items: center;
        margin-top: auto;
        padding: 0 24px;
        cursor: pointer;
        p {
            margin-left: 8px;
            color: var(--grey60);
            font-weight: 400;
            font-size: 14px;
        }
    }
`

const StyledNav = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-bottom: 24px;
    background: ${(props) => props.theme.navbarBg};
    box-shadow: 6px 0px 16px rgba(10, 31, 51, 0.05);
    transition: 0.5s all ease;
    transform: translateX(0);
    @media screen and (max-width: 1280px) {
        padding-top: 24px;
        padding-bottom: 32px;
        width: 240px;
        position: fixed;
        z-index: 10;
        left: 0;
        transform: ${(props) =>
            props.isBurger ? 'translateX(0)' : 'translateX(-240px)'};
    }

    a.colored {
        &.active {
            path {
                stroke: var(--pink);
                transition: 0.2s all ease;
            }
            p {
                color: var(--pink);
                font-weight: 600;
                transition: 0.2s all ease;
            }
        }
    }

    a.need {
        cursor: pointer;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        margin: 0 9px;

        &.active {
            path {
                stroke: ${(props) => (props.stroke ? 'var(--pink)' : 'none')};
                fill: ${(props) => (props.stroke ? 'none' : 'var(--pink)')};
                transition: 0.2s all ease;
            }
            p {
                color: var(--pink);
                font-weight: 600;
                transition: 0.2s all ease;
            }
        }

        p {
            color: var(--grey60);
            font-weight: 400;
            font-size: 14px;
            margin-left: 8px;
        }

        &:hover {
            transition: 0.2s all ease;
            background: ${(props) => props.theme.navbarHover};
            border-radius: 8px;
            path {
                stroke: ${(props) =>
                    props.stroke ? props.theme.navbarHoverFill : 'none'};
                fill: ${(props) =>
                    props.stroke ? 'none' : props.theme.navbarHoverFill};
                transition: 0.2s all ease;
            }
            p {
                color: ${(props) => props.theme.navbarHoverFill};
                font-weight: 600;
                transition: 0.2s all ease;
            }
        }
    }
`

const Block = styled.div`
    &:nth-child(n + 2) {
        margin-top: 40px;
    }

    @media screen and (max-width: 1280px) {
        margin: 0 !important;
        &:nth-child(n + 3) {
            margin-top: 24px !important;
        }
    }
`

const Top = styled.div``

const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 44px;
    padding: 24px 24px 0;
    img {
        width: 20px;
        height: 28px;
    }
    p {
        margin-left: 8px;
        font-weight: 600;
        font-size: 24px;
        color: ${(props) => props.theme.faqColor};
    }
    @media screen and (max-width: 1280px) {
        display: none;
    }
`

const Title = styled.h4`
    padding: 0 24px;
    font-weight: 400;
    color: var(--grey60);
    margin-left: 1px;
    font-size: 12px;
    margin-bottom: 16px;
    @media screen and (max-width: 1280px) {
        margin-bottom: 12px;
    }
`

const StyledLink = styled.div`
    cursor: pointer;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin: 0 9px;

    p {
        color: var(--grey60);
        font-weight: 400;
        font-size: 14px;
        margin-left: 8px;
    }

    &:hover {
        transition: 0.2s all ease;
        background: ${(props) => props.theme.navbarHover};
        border-radius: 8px;
        path {
            stroke: ${(props) =>
                props.stroke ? props.theme.navbarHoverFill : 'none'};
            fill: ${(props) =>
                props.stroke ? 'none' : props.theme.navbarHoverFill};
            transition: 0.2s all ease;
        }
        p {
            color: ${(props) => props.theme.navbarHoverFill};
            font-weight: 600;
            transition: 0.2s all ease;
        }
    }
`

const Bottom = styled.div`
    margin-top: auto;
    padding-top: 28px;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    p {
        color: ${(props) => props.theme.navbarBottom};
    }

    @media screen and (max-width: 1280px) {
        display: none;
    }
`

const Icons = styled.div`
    padding: 0 25px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    svg {
        cursor: pointer;
        width: 20px;
        height: 20px;
    }
    svg:not(:last-child) {
        margin-right: 12px;
    }
    path {
        fill: ${(props) => props.theme.navbarBottom};
    }
`

const Row = styled.div`
    padding: 0 25px;
    display: flex;
    align-items: center;
`

const BottomLink = styled.p`
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    color: var(--grey80);
`

const BottomText = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: var(--grey80);
`

const Line = styled.div`
    height: 15px;
    width: 1px;
    background: ${(props) => props.theme.navbarBottom};
    margin: 0 7px;
`
