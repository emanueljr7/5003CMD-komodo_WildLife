let reports = [];

function showSection(id) {
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

function login(e) {
    e.preventDefault();
    const role = document.getElementById("role").value;
    showSection("dashboard");

    const dash = document.getElementById("dashboardContent");

    dash.innerHTML = `
        <div class="card">
            <h3>${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h3>
            <p>Role-based access simulation active.</p>
        </div>`;
}

function submitReport(e) {
    e.preventDefault();

    const species = document.getElementById("species").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const contributorType = document.getElementById("contributorType").value;

    const report = {
        species,
        location,
        description,
        contributorType
    };

    reports.push(report);
    updateLibrary("all");
    e.target.reset();
    alert("Contribution successfully added!");
}

function updateLibrary(filter) {
    const library = document.getElementById("libraryList");
    library.innerHTML = "";

    let filteredReports = reports;

    if (filter !== "all") {
        filteredReports = reports.filter(r => r.contributorType === filter);
    }

    filteredReports.forEach(report => {
        const card = document.createElement("div");
        card.classList.add("card");

        const tagClass = report.contributorType === "school" ? "school-tag" : "community-tag";
        const tagLabel = report.contributorType === "school" ? "School Contribution" : "Community Contribution";

        card.innerHTML = `
            <h3>${report.species}</h3>
            <p><strong>Location:</strong> ${report.location}</p>
            <p>${report.description}</p>
            <span class="tag ${tagClass}">${tagLabel}</span>
        `;

        library.appendChild(card);
    });

    updateStats();
}

function filterLibrary(type) {
    updateLibrary(type);
}

function updateStats() {
    const total = reports.length;
    const school = reports.filter(r => r.contributorType === "school").length;
    const community = reports.filter(r => r.contributorType === "community").length;

    document.getElementById("totalReports").textContent = total;
    document.getElementById("schoolReports").textContent = school;
    document.getElementById("communityReports").textContent = community;
}