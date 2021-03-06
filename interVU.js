/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'InterVU';
const GET_QUESTION_MESSAGE = "Here's your question: ";
const HELP_MESSAGE = 'You can say ask me a question, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Describe a major change that occurred in a job that you held. How did you adapt to this change?',
    'Tell us about a situation in which you had to adjust to changes over which you had no control. How did you handle it?',
    'Tell us about a time that you had to adapt to a difficult situation.',
    'What do you do when priorities change quickly? Give one example of when this happened.',
    'Describe a project or idea that was implemented primarily because of your efforts. What was your role? What was the outcome?',
    'Describe a time when you made a suggestion to improve the work in your organization. Give an example of an important goal that you set in the past. Tell about your success in reaching it.',
    'How many hours a day do you put into your work? What were your study patterns at school?',
    'Tell us about a time when you had to go above and beyond the call of duty in order to get a job done.',
    'Tell us about a time when a job had to be completed and you were able to focus your attention and efforts to get it done.',
    'Tell us about a time when you were particularly effective on prioritizing tasks and completing a project on schedule.',
    'Tell us about the last time that you undertook a project that demanded a lot of initiative. Tell us how you keep your job knowledge current with the on going changes in the industry. There are times when we work without close supervision or support to get the job done. Tell us about a time when you found yourself in such a situation and how things turned out. What impact did you have in your last job?',
    'What is the most competitive work situation you have experienced? How did you handle it?',
    'What is the riskiest decision you have made? What was the situation? What happened?',
    'What kinds of challenges did you face on your last job? Give an example of how you handled them.',
    'What projects have you started on your own recently? What prompted you to get started?',
    'What sorts of things have you done to become better qualified for your career?',
    'What was the best idea that you came up with in your career? How did you apply it?',
    'When you disagree with your manager, what do you do? Give an example.',
    'When you have a lot of work to do, how do you get it all done? Give an example?',
    'Describe the project or situation which best demonstrates your analytical abilities. What was your role?',
    'Developing and using a detailed procedure is often very important in a job. Tell about a time when you needed to develop and use a detailed procedure to successfully complete a project.',
    'Give a specific example of a time when you used good judgment and login in solving a problem.',
    'Give me a specific example of a time when you used good judgment and logic in solving a problem.',
    'Give me an example of when you took a risk to achieve a goal. What was the outcome? ',
    'Lead me through your decision process',
    'Relate a specific instance when you found it necessary to be precise in your in order to complete the job.',
    'Tell us about a job or setting where great precision to detail was required to complete a task.',
    'How did you handle that situation?',
    'Tell us about a time when you had to analyze information and make a recommendation. What kind of thought process did you go through? What was your reasoning behind your decision?',
    'Tell us about your experience in past jobs that required you to be especially alert to details while doing the task involved.',
    'Give a specific example of a time when you had to address an angry customer. What was the problem and what was the outcome? How would you asses your role in diffusing the situation?',
    'It is very important to build good relationships at work but sometimes it doesn\'t always work. If you can, tell about a time when you were not able to build a successful relationship with a difficult person.',
    'Tell us about a time when you built rapport quickly with someone under difficult conditions.',
    'What, in your opinion, are the key ingredients in guiding and maintaining successful business relationships? Give examples of how you made these work for you.',
    'Describe how your position contributes to your organization unit\'s goals. What are the unit\'s goals/mission?',
    'Tell us about a politically complex work situation in which you worked.',
    'Have you ever worked in a situation where the rules and guidelines were not clear? Tell me about it. How did you feel about it? How did you react?',
    'Some people consider themselves to be big picture people and others are detail oriented. Which are you? Give an example of a time when you displayed this.',
    'Tell us me about a situation when it was important for you to pay attention to details. How did you handle it?',
    'Tell us me about a time when you demonstrated too much initiative?',
    'Describe a situation in which you were able to effectively "read" another person and guide your actions by your understanding of their individual needs or values.',
    'Describe a situation when you were able to strengthen a relationship by communicating effectively. What made your communication effective?',
    'Describe a situation where you felt you had not communicated well. How did you correct the situation?',
    'Describe a time when you were able to effectively communicate a difficult or unpleasant idea to a superior.',
    'Describe the most significant written document, report or presentation which you had to complete.',
    'Give me an example of a time when you were able to successfully communicate with another person, even when that individual may not have personally liked you , or vice versa.',
    'Give me an example of a time when you were able to successfully communicate with another person, even when that individual may not have personally liked you.',
    'Have you ever had to sell an idea to your co-workers or group? How did you do it? Did they buy it?',
    'How do you keep subordinates informed about information that affects their jobs?',
    'How do you keep your manager informed about what is being done in your work area?',
    'How do you go about explaining a complex technical problem to a person who does not understand technical jargon? What approach do you take in communicating with people?',
    'What kinds of communication situations cause you difficulty? Give an example.',
    'Tell us about a recent successful experience in making a speech or presentation. How did you prepare? What obstacles did you face? How did you handle them?',
    'Tell us about a time when you and your current/previous supervisor disagreed but you still found a way to get your point across.',
    'Tell us about a time when you had to present complex information. How did you ensure that the other person understood?',
    'Tell us about a time when you had to use your verbal communication skills in order to get a point across that was important to you.',
    'Tell us about a time when you were particularly effective in a talk you gave or a seminar you taught.',
    'Tell us about an experience in which you had to speak up in order to be sure that other people knew what you thought or felt.',
    'Tell us me about a situation when you had to speak up (be assertive) in order to get a point across that was important to you.',
    'Tell us me about a time in which you had to use your written communication skills in order to get an important point across.',
    'What challenges have occurred while you were coordinating work with other units, departments, and/or divisions?',
    'What have you done to improve your verbal communication skills?',
    'How have you persuaded people through a document you prepared?',
    'What are the most challenging documents you have done? What kinds of proposals have you written?',
    'What kinds of writing have you done? How do you prepare written communications?',
    'Describe a time when you took personal accountability for a conflict and initiated contact with the individual(s) involved to explain your actions.',
    'How do you handle problems with customers? Give an example.',
    'How do you go about establishing rapport with a customer? What have you done to gain their confidence? Give an example.',
    'What have you done to improve relations with your customers?',
    'Discuss an important decision you have made regarding a task or project at work. What factors influenced your decision?',
    'Everyone has made some poor decisions or has done something that just did not turn out right. Has this happened to you? What happened?',
    'Give an example of a time in which you had to be relatively quick in coming to a decision.',
    'Give an example of a time in which you had to keep from speaking or not finish a task because you did not have enough information to come to a good decision. Give an example of a time when there was a decision to be made and procedures were not in place?',
    'Give me an example of a time when you had to keep from speaking or making a decision because you did not have enough information.',
    'How did you go about deciding what strategy to employ when dealing with a difficult customer?',
    'How do you go about developing I information to make a decision? Give an example.',
    'How do you involve your manager and/or others when you make a decision?',
    'How have you gone about making important decisions?',
    'How quickly do you make decisions? Give an example.',
    'In a current job task, what steps do you go through to ensure your decisions are correct/effective?',
    'Tell us about a time when you had to defend a decision you made even though other important people were opposed to your decision.',
    'What kind of decisions do you make rapidly? What kind takes more time? Give examples.',
    'What kinds of problems have you had coordinating technical projects? How did you solve them?',
    'What was your most difficult decision in the last 6 months? What made it difficult?',
    'When you have to make a highly technical decision, how do you go about doing it?',
    'Do you consider yourself a macro or micro manager? How do you delegate?',
    'How do you make the decision to delegate work?',
    'Tell us how you go about delegating work?',
    'What was the biggest mistake you have had when delegating work? The biggest success?',
    'Describe a situation where you had the option to leave the details to others or you could take care of them yourself.',
    'Do prefer to work with the "big picture" or the "details" of a situation? Give me an example of an experience that illustrates your preference.',
    'Have the jobs you held in the past required little attention, moderate attention, or a great deal of attention to detail? Give me an example of a situation that illustrates this requirement.',
    'Tell us about a difficult experience you had in working with details.',
    'Tell us about a situation where attention to detail was either important or unimportant in accomplishing an assigned task.',
    'Have you ever had a situation where you had a number of alternatives to choose from? How did you go about choosing one?',
    'What are some of the major decisions you have made over the past (6, 12, 18) months?',
    'What kinds of decisions are most difficult for you? Describe one?',
    'Have you ever had a subordinate whose performance was consistently marginal? What did you do?',
    'How have you adjusted your style when it was not meeting the objectives and/or people were not responding correctly?',
    'What do you do when you are faced with an obstacle to an important project? Give an example.',
    'When you have difficulty persuading someone to your point of view, what do you do? Give an example.',
    'How did you keep track of delegated assignments?',
    'How do you evaluate the productivity/effectiveness of your subordinates?',
    'How do you get data for performance reviews?',
    'How do you keep track of what your subordinates are doing?',
    'Give me an example of when you had to go above and beyond the call of duty in order to get a job done.',
    'Give me examples of projects/tasks you started on your own.',
    'Give some instances in which you anticipated problems and were able to influence a new direction.',
    'How did you get work assignments at your most recent employer?',
    'What changes did you develop at your most recent employer?',
    'What kinds of things really get your excited?',
    'What sorts of projects did you generate that required you to go beyond your job description?',
    'What sorts of things did you do at school that were beyond expectations?',
    'Describe a recent unpopular decision you made and what the result was.',
    'Describe a recent unpopular decision you made and what the result was.',
    'Describe a situation in which you were able to effectively "read" another person and guide your actions by your understanding of their needs and values.',
    'Tell us about the most difficult or frustrating individual that you\'ve ever had to work with, and how you managed to work with them.',
    'What have you done in past situations to contribute toward a teamwork environment?',
    'What have you done in the past to contribute toward a teamwork environment?',
    'Can you think of a situation where innovation was required at work? What did you do in this situation?',
    'Describe a situation when you demonstrated initiative and took action without waiting for direction. What was the outcome?',
    'Describe a time when you came up with a creative solution/idea/project/report to a problem in your past work.',
    'Describe something that you have implemented at work. What were the steps used to implement this?',
    'Describe the most creative work-related project which you have carried out.',
    'Give me an example of when you took a risk to achieve a goal. What was the outcome?',
    'Sometimes it is essential that we break out of the routine, standardized way of doing things in order to complete the task. Give an example of when you were able to successfully develop such a new approach.',
    'Tell us about a problem that you solved in a unique or unusual way. What was the outcome? Were you satisfied with it?',
    'Tell us about a suggestion you made to improve the way job processes/operations worked. What was the result?',
    'There are many jobs in which well-established methods are typically followed. Give a specific example of a time when you tried some other method to do the job.',
    'There are many jobs that require creative or innovative thinking. Give an example of when you had such a job and how you handled it.',
    'What have been some of your most creative ideas?',
    'What innovative procedures have you developed? How did you develop them? Who was involved? Where did the ideas come from?',
    'What new or unusual ideas have you developed on your job? How did you develop them? What was the result? Did you implement them?',
    'When was the last time that you thought "outside of the box" and how did you do it?',
    'Describe a time when you were asked to keep information confidential.',
    'Give examples of how you have acted with integrity in your job/work relationship.',
    'If you can, tell about a time when your trustworthiness was challenged. How did you react/respond?',
    'On occasion we are confronted by dishonesty in the workplace. Tell about such an occurrence and how you handled it.',
    'Tell us about a specific time when you had to handle a tough problem which challenged fairness or ethnical issues.',
    'Trust requires personal accountability. Can you tell about a time when you chose to trust someone? What was the outcome?',
    'Have you ever had to introduce a policy change to your work group? How did you do it?',
    'Have you ever met resistance when implementing a new idea or policy to a work group? How did you deal with it? What happened?',
    'When is the last time you had to introduce a new idea or procedure to people on this job? How did you do it?',
    'Give an example of a time in which you felt you were able to build motivation in your coworkers or subordinates at work.',
    'Give an example of your ability to build motivation in your co-workers, classmates, and even if on a volunteer committee.',
    'Have you ever had difficulty getting others to accept your ideas? What was your approach? Did it work?',
    'Have you ever been a member of a group where two of the members did not work well together? What did you do to get them to do so?',
    'What is the toughest group that you have had to get cooperation from?',
    'What is the toughest group that you have had to get cooperation from? Describe how you handled it. What was the outcome?',
    'Give an example of a time when you made a mistake because you did not listen well to what someone had to say.',
    'How often do you have to rely on information you have gathered from others when talking to them? What kinds of problems have you had? What happened?',
    'What do you do to show people that you are listing to them?',
    'When is listening important on your job? When is listening difficult?',
    'Have you ever had a subordinate whose work was always marginal? How did you deal with that person? What happened?',
    'How do you deal with people whose work exceeds your expectations?',
    'How do you get subordinates to produce at a high level? Give an example.',
    'How do you get subordinates to work at their peak potential? Give an example.',
    'How do you manage cross-functional teams?',
    'Describe a situation when you were able to have a positive influence on the actions of others.',
    'Give an example of a time when you went above and beyond the call of duty.',
    'Give me an example of a time when you went above and beyond the call of duty.',
    'How would you define "success" for someone in your chosen career?',
    'Tell us me about an important goal that you set in the past. Were you successful? Why?',
    'Describe the most challenging negotiation in which you were involved. What did you do? What were the results for you? What were the results for the other party?',
    'Have you ever been in a situation where you had to bargain with someone? How did you feel about this? What did you do? Give an example.',
    'Tell us about the last time you had to negotiate with someone. What was the most difficult part?',
    'Describe a time when you had to make a difficult choice between your personal and professional life.',
    'Give me an example of a project that best describes your organizational skills.',
    'How do you decide what gets top priority when scheduling your time?',
    'What do you do when your schedule is suddenly interrupted? Give an example.',
    'Give an example of a time when you helped a staff member accept change and make the necessary adjustments to move forward. What were the change/transition skills that you used.',
    'Give an example of how you have been successful at empowering either a person or a group of people into accomplishing a task.',
    'How do you handle a subordinate whose work is not up to expectations?',
    'How do you coach a subordinate to develop a new skill?',
    'How do you handle performance reviews? Tell me about a difficult one.',
    'How often do you discuss a subordinate\'s performance with him/her? Give an example.',
    'Tell us about a specific development plan that you created and carried out with one or more of your employees. What was the specific situation? What were the components of the development plan? What was the outcome?',
    'Tell us about a time when you had to take disciplinary action with someone you supervised.',
    'Tell us about a time when you had to tell a staff member that you were dissatisfied with his or her work.',
    'Tell us about a time when you had to use your authority to get something done. Where there any negative consequences?',
    'There are times when people need extra help. Give an example of when you were able to provide that support to a person with whom you worked.',
    'What have you done to develop the skills of your staff?',
    'When do you give positive feedback to people? Tell me about the last time you did. Give an example of how you handle the need for constructive criticism with a subordinate or peer.',
    'Give an example of a situation where others were intense but you were able to maintain your composure.',
    'It is important to maintain a positive attitude at work when you have other things on your mind.',
    'Give a specific example of when you were able to do that.',
    'Keeping others informed of your progress/actions helps them fell comfortable. Tell your methods for keeping your supervisor advised of the status on projects.',
    'Tell us about a recent job or experience that you would describe as a real learning experience? What did you learn from the job or experience?',
    'Tell us about a time when you took responsibility for an error and were held personally accountable.',
    'Tell us about a time when your supervisor criticized your work. How did you respond?',
    'Tell us about some demanding situations in which you managed to remain calm and composed.',
    'There are times when we are placed under extreme pressure on the job. Tell about a time when you were under such pressure and how you handled it.',
    'What have you done to further your own professional development in the past 5 years.',
    'When you have been made aware of, or have discovered for yourself, a problem in your work performance, what was your course of action? Can you give an example?',
    'Describe a situation in which you were able to positively influence the actions of others in a desired direction.',
    'Describe a situation where you were able to use persuasion to successfully convince someone to see things your way.',
    'Describe a time when you were able to convince a skeptical or resistant customer to purchase a project or utilize your services.',
    'Have you ever had to persuade a group to accept a proposal or idea? How did you go about doing it? What was the result?',
    'Have you ever had to persuade a peer or manager to accept an idea that you knew they would not like? Describe the resistance you met and how you overcame it.',
    'How do you get a peer or colleague to accept one of your ideas?',
    'In selling an idea, it is sometimes useful to use metaphors, analogies, or stories to make your point. Give a recent example of when you were able to successfully do that.',
    'Tell us about a time when you had to convince someone in authority about your ideas. How did it work out?',
    'Tell us about a time when you used facts and reason to persuade someone to accept your recommendation.',
    'Tell us about a time when you used your leadership ability to gain support for what initially had strong opposition.',
    'Tell us about a time when you were able to successfully influence another person.',
    'Describe how you develop a project team\'s goals and project plan?',
    'How do you schedule your time? Set priorities? How do you handle doing twenty things at once?',
    'What do you do when your time schedule or project plan is upset by unforeseen circumstances? Give an example.',
    'What have you done in order to be effective with your organization and planning?',
    'How do you prepare for a presentation to a group of technical experts in your field?',
    'How would you describe your presentation style?',
    'Tell us about the most effective presentation you have made. What was the topic? What made it difficult? How did you handle it?',
    'Describe the most difficult working relationship you\'ve had with an individual. What specific actions did you take to improve the relationship? What was the outcome?',
    'Give me an example of a situation where you had difficulties with a team member. What, if anything, did you do to resolve the difficulties?',
    'Have you ever been caught unaware by a problem or obstacles that you had not foreseen? What happened?',
    'Tell us about a time when you did something completely different from the plan and/or assignment. Why? What happened?',
    'What are some of the problems you have faced; such as between business development and project leaders, between one department and another, between you and your peers? How did you recognize that they were there?',
    'When was the last time something came up in a meeting that was not covered in the plan? What did you do? What were the results of your judgment?',
    'Describe a situation where you had a conflict with another individual, and how you dealt with it. What was the outcome? How do you feel about it?',
    'Describe a time in which you were faced with problems or stresses which tested your coping skills. What did you do?',
    'Describe a time when you facilitated a creative solution to a problem between two employees.',
    'Give a specific example of a time when you used good judgment and logic in solving a problem.',
    'Give an example of a problem which you faced on any job that you have had and tell how you went about solving it.',
    'Give an example of when you "went to the source" to address a conflict. Do you feel trust levels were improved as a result?',
    'Problems occur in almost all work relationships. Describe a time when you had to cope with the resentment or hostility of a subordinate or co-worker.',
    'Some problems require developing a unique approach. Tell about a time when you were able to develop a different problem-solving approach.',
    'Sometimes the only way to resolve a defense or conflict is through negotiation and compromise. Tell about a time when you were able to resolve a difficult situation by finding some common ground.',
    'Sometimes we need to remain calm on the outside when we are really upset on the inside. Give an example of a time that this happened to you.',
    'Tell us about a recent success you had with an especially difficult employee/co-worker.',
    'Tell us about a situation in which you had to separate the person from the issue when working to resolve issues.',
    'Tell us about a time when you identified a potential problem and resolved the situation before it became serious.',
    'There is more than one way to solve a problem. Give an example from your recent work experience that would illustrate this.',
    'Tell us about a time when you influenced the outcome of a project by taking a leadership role.',
    'Using a specific example of a project, tell how you kept those involved informed of the progress',
    'Describe a situation where you had to use conflict management skills.',
    'Describe a situation where you had to use confrontation skills.',
    'Give me an example of a time when a company policy or action hurt people. What, if anything, did you do to mitigate the negative consequences to people?',
    'How do you typically deal with conflict? Can you give me an example?',
    'Tell us about a time when you were forced to make an unpopular decision.',
    'What would your co-workers (or staff) stay is the most frustrating thing about your communications with them?',
    'Have you ever dealt with a situation where communications were poor? Where there was a lack of cooperation? Lack of trust? How did you handle these situations?',
    'What do you do when a subordinate comes to you with a challenge?',
    'What have you done to help your subordinates to be more productive?',
    'What have you done to make sure that your subordinates can be productive? Give an example.',
    'Have you ever been in a situation where you had to settle an argument between two friends (or people you knew)? What did you do? What was the result?',
    'Have you ever had to settle conflict between two people on the job? What was the situation and what did you do?',
    'Tell us about a time when you had to help two peers settle a dispute. How did you go about identifying the issues? What did you do? What was the result?',
    'Tell us about a time when you organized or planned an event that was very successful.',
    'Can you recall a time when you were less than pleased with your performance?',
    'Describe a situation in which you were able to use persuasion to successfully convince someone to see things your way.',
    'Give me a specific occasion in which you conformed to a policy with which you did not agree.',
    'Give me an example of an important goal that you h ad set in the past and tell me about your success in reaching it.',
    'If there were one area you\'ve always wanted to improve upon, what would that be?',
    'In what ways are you trying to improve yourself?',
    'Tell us about a time when you had to go above and beyond the call of duty in order to get a job done.',
    'What do you consider to be your professional strengths? Give me a specific example using this attribute in the workplace.',
    'What goal have you set for yourself that you have successfully achieved?',
    'What was the most useful criticism you ever received?',
    'How do you communicate goals to subordinates? Give an example.',
    'How do you involve people in developing your unit\'s goals? Give an example.',
    'How do you go about setting goals with subordinates? How do you involve them in this process?',
    'How do you let subordinates know what you expect of them?',
    'What performance standards do you have for your unit? How have you communicated them to your subordinates?',
    'Have you ever been overloaded with work? How do you keep track of work so that it gets done on time?',
    'How do you manage your time? How do you schedule your time?',
    'When given an important assignment, how do you approach it?',
    'Describe a situation when you had to exercise a significant amount of self-control.',
    'Give me an example of a time in which you had to be relatively quick in coming to a decision.',
    'Give me an example of when you were able to meet the personal and professional demands in your life yet still maintained a healthy balance.',
    'Give me an example of when you were responsible for an error or mistake. What was the outcome? What, if anything, would you do differently?',
    'If you were interviewing for this position what would you be looking for in the applicants?',
    'We work with a great deal of confidential information. Describe how you would have handled sensitive information in a past work experience. What strategies would you utilize to maintain confidentiality when pressured by others?',
    'When have you had to produce results without sufficient guidelines? Give an example.',
    'Describe what steps/methods you have used to define/identify a vision for your unit/position.',
    'How do you see your job relating to the overall goals of the organization?',
    'In your current or former position, what were your long and short-term goals?',
    'Tell us about a time when you anticipated the future and made changes to current responsibilities/operations to meet future needs.',
    'How did you react when faced with constant time pressure? Give an example.',
    'People react differently when job demands are constantly changing; how do you react?',
    'What kind of events cause you stress on the job?',
    'What was the most stressful situation you have faced? How did you deal with it?',
    'Describe a situation in which you had to arrive at a compromise or help others to compromise.',
    'What was your role? What steps did you take? What was the end result?',
    'Describe a team experience you found disappointing. What would you have done to prevent this?',
    'Describe a team experience you found rewarding.',
    'Describe the types of teams you\'ve been involved with. What were your roles?',
    'Describe your leadership style and give an example of a situation when you successfully led a group.',
    'Give an example of how you have been successful at empowering a group of people in accomplishing a task.',
    'Give an example of how you worked effectively with people to accomplish an important result.',
    'Have you ever been a project leader? Give examples of problems you experienced and how you reacted.',
    'Have you ever been in a position where you had to lead a group of peers? How did you handle it?',
    'Have you ever participated in a task group? What was your role? How did you contribute?',
    'Please give your best example of working cooperatively as a team member to accomplish an important goal. What was the goal or objective? To what extent did you interact with others on this project?',
    'Some people work best as part of a group - others prefer the role of individual contributor. How would you describe yourself? Give an example of a situation where you felt you were most effective.',
    'Tell us about a time that you had to work on a team that did not get along. What happened? What role did you take? What was the result?',
    'Tell us about a work experience where you had to work closely with others. How did it go? How did you overcome any difficulties?',
    'Tell us about the most difficult challenge you faced in trying to work cooperatively with someone who did not share the same ideas? What was your role in achieving the work objective?',
    'Tell us about the most difficult situation you have had when leading a team. What happened and what did you do? Was it successful? Emphasize the "single" most important thing you did?',
    'Tell us about the most effective contribution you have made as part of a task group or special project team.',
    'Think about the times you have been a team leader. What could you have done to be more effective?',
    'What is the difficult part of being a member, not leader, of a team? How did you handle this?',
    'What role have you typically played as a member of a team? How did you interact with other members of the team?',
    'When is the last time you had a disagreement with a peer? How did you resolve the situation?',
    'When working on a team project have you ever had an experience where there was strong disagreement among team members? What did you do?',
    'Describe a situation that required you to do a number of things at the same time. How did you handle it? What was the result?',
    'How do you determine priorities in scheduling your time? Give an example.',
    'How do you typically plan your day to manage your time effectively?',
    'Of your current assignments, which do you consider to have required the greatest amount of effort with regard to planning/organization? How have you accomplished this assignment? Howwould you asses your effectiveness?',
    'On many occasions, managers have to make tough decisions. What was the most difficult one you have had to make?',
    'Tell us about setbacks you have faced. How did you deal with them?',
    'What has been your major work related disappointment? What happened and what did you do?',
    'What is the most competitive situation you have experienced? How did you handle it? What was the result?',
    'When was the last time you made a key decision on the spur of the moment? What was the reason and result?',
    'When was the last time you were in a crises? What was the situation? How did you react?',
    'Which of your jobs had the most rapid change? How did you feel about it?',
    'Give a specific example of how you have helped create an environment where differences are valued, encouraged and supported.',
    'Tell us about a time that you successfully adapted to a culturally different environment.',
    'Tell us about a time when you had to adapt to a wide variety of people by accepting/understanding their perspective.',
    'Tell us about a time when you made an intentional effort to get to know someone from another culture.',
    'What have you done to further your knowledge/understanding about diversity? How have you demonstrated your learning?',
    'What have you done to support diversity in your unit?',
    'What measures have you taken to make someone feel comfortable in an environment that was obviously uncomfortable with his or her presence?',

];

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewQuestionIntent');
    },
    'GetNewQuestionIntent': function () {
        const questionArr = data;
        const questionIndex = Math.floor(Math.random() * questionArr.length);
        const randomQuestion = questionArr[questionIndex];
        const speechOutput = GET_QUESTION_MESSAGE + randomQuestion;

        this.response.cardRenderer(SKILL_NAME, randomQuestion);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};// JavaScript source code
