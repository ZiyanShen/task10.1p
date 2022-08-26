import React from 'react';
import styles from "./index.module.less"

function UserInfo(props) {
    return (
        <div className={styles.UserInfo}>
            <img src="/images/1881658121682_.pic_hd.jpg" alt=""/>
            <div className="info">I am a full-stack web developer based in Melbourne,Australia</div>
            <hr className="line"/>
            <div className="H">Here's what I've done so far</div>
            <div className="item">
                <img src="/images/84c21555eae44d3092d8d503f271aa02.pic.jpg" alt=""/>
                <p>I work on a robot that can help society or the environment, so that robots can help humans in
                    a real sense.It snows in many countries around the world and the roads are very unsafe
                    afterwards, so I want to design a robot that can automatically remove snow to help humans.I
                    designed a robot that automatically clears snow according to the lines on the road，This uses
                    the methods learnt on the Line follower sensor，When the snowplows is in motion the
                    ultrasonic sensors can be used depending on the distance to the snow, when the distance
                    between the vehicle and the snow is Less than than 50 cm the snowplows Start collecting
                    snowballs，When snow is detected (my design is a variety of coloured balls, so I use a colour
                    sensor) the robot automatically shovels up the snow for five seconds and then releases the
                    shovel，It will continue to do all the snow clearing automatically and then return to its
                    designated place, partly as a result of the artificial intelligence part of the study.So I
                    designed this automatic snow ploughing robot to help people.</p>
            </div>
            <div className="item">
                <img src="/images/a34f70a8ecb5eff467ef0f4aea975827.pic.jpg" alt=""/>
                <p> Nowadays, all industries have their own working system, which can significantly improve the
                    work down, so does the banking system, I edit the banking system can 1. Basic information
                    query Customers can view the name, currency, amount, starting date, deposit period, interest
                    rate and other information of all the sub-accounts that have been selected to open a card.
                    2;
                    2. Transaction information inquiry: Customers can inquire about all transactions under the
                    One Card account at any time, including all withdrawals, transfers, interest settlements,
                    loan issuance and repayment, etc. 3;
                    3. Transfer: Customers can transfer funds between their One Card or credit card accounts,
                    and transfer funds between fixed and live accounts within the account. Internet Banking also
                    provides a payee information management function for users to store common payee information
                    for the next transfer. 4;
                    4. Change Password: Customers can change their own Internet Banking password and account
                    password;
                    5. Online Lost: Customers can lose their card and credit card accounts online, after which
                    the accounts cannot be accessed or transferred. 6.
                    Online payment: Online payment is a form of electronic payment. Broadly speaking, online
                    payment refers to the entire process of payment between customers, merchants, network banks
                    (or third-party payment) using secure electronic means, using a card, credit cards and other
                    payment tools transmitted to the bank or the corresponding processing institution through
                    the Internet. Businesses that can be paid include: violation fines, utility bills, tuition
                    payments, phone bill payments</p>

            </div>
            <hr className="line"/>
            <div className="H">My photos</div>
            <div className="phone">
                <img src="/images/1841658121680_.pic.jpg" alt=""/>
                <img src="/images/1851658121681_.pic.jpg" alt="" srcSet=""/>
                <img src="/images/1861658121681_.pic.jpg" alt="" srcSet=""/>
                <img src="/images/1871658121681_.pic.jpg" alt=""/>
            </div>
        </div>
    );
}

export default UserInfo;