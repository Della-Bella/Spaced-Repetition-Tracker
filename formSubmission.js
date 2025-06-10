
import { addData } from "./storage.mjs";
import { calculateRevisionDates } from "./script.mjs";
import { addTopic, topicTitleInput, startDate, userDropdown, displayUserAgenda } from "./script.mjs";

export function addTopics() {

    addTopic.addEventListener('submit', (event) => {
        event.preventDefault(); // no reloding
        console.log("Form submitted, page reload prevented.");

  
        const topicTitle = topicTitleInput.value.trim();// clena spaces
        const topicStartDate = startDate.value;
        const selectedUserId = userDropdown.value;

        // --- VALIDATION ---
        if (!selectedUserId) {
            alert("Please select a user first.");
            return; // Stop the function here
        }

        if (!topicTitle) {
            alert("Please enter a topic title.");
            return; // Stop the function here
      };
        // Calculate the Revision Dates
        console.log(`Calculating revisions for: ${topicTitle}`);
        const newRevisions = calculateRevisionDates(topicStartDate, topicTitle);

        // Save the New Data
        addData(selectedUserId, newRevisions);
        console.log("Data saved", selectedUserId);

        //Clean Up the Form
        alert(`Success! Topic "${topicTitle}" has been added.`);
        topicTitleInput.value = ""; // Clear the input 

        displayUserAgenda(selectedUserId);
    });
}