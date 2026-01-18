const examples = {
  instagram: `Terms of Service for Instagram

1. Your Commitments: You agree that you will not use Instagram to share content that is illegal, misleading, discriminatory or fraudulent.

2. Data Usage and Privacy: We collect information about your activity on our services. We use this information to provide, personalize, and improve our products. We may share your information with third-party partners and service providers who help us operate and improve our services.

3. Intellectual Property: You retain ownership of your content, but you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content.

4. Disputes and Arbitration: You agree to resolve any dispute through binding arbitration instead of in court, and you waive your right to participate in a class action lawsuit or class-wide arbitration.

5. Termination: We may terminate or suspend your account at any time without prior notice or liability, for any reason whatsoever.

6. Changes to Terms: We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.`,

  chatgpt: `OpenAI Terms of Use

1. Registration and Access: You must provide accurate information when creating an account. You are responsible for safeguarding your account credentials.

2. Usage Requirements: You may not use our services to develop competing products, reverse engineer our models, or extract data through automated means without permission.

3. Content and Data: We may use your content to provide, maintain, and improve our services and comply with applicable law.

4. Fees and Payment: Paid services are billed in advance on a subscription basis. Fees are non-refundable except as required by law. We may change fees with 30 days' notice.

5. Disclaimers: Our services are provided "as is" without warranties. We do not guarantee accuracy, reliability, or suitability of output for your purposes.

6. Limitation of Liability: To the maximum extent permitted by law, we will not be liable for any indirect, incidental, special, consequential or punitive damages.

7. Indemnification: You will defend, indemnify, and hold us harmless from any claims arising from your use of the services.`,

  tiktok: `TikTok Terms of Service

1. Your Use of the Platform: You must be at least 13 years old to use TikTok. You agree not to use the platform for any unlawful purposes.

2. Your Content: You retain all ownership rights in your content, but you grant TikTok a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, distribute, prepare derivative works, display, and perform your content in connection with the platform.

3. Data Collection and Use: We collect information you provide directly, usage information, device information, and location data. We use cookies and similar technologies to track your activity. We may share your data with advertisers, business partners, and service providers.

4. Content Moderation: We reserve the right to remove any content or suspend any account at our sole discretion, without notice or liability.

5. Prohibited Activities: You agree not to access or use the platform by automated means, interfere with the platform's operation, or attempt to gain unauthorized access.

6. Dispute Resolution: Any disputes shall be resolved through binding arbitration on an individual basis. You waive any right to a jury trial and to participate in class actions.

7. Governing Law: These Terms shall be governed by the laws of Singapore.`
};

function loadExample(type) {
  document.getElementById('tos-input').value = examples[type];
}

async function scanToS() {
  const tosText = document.getElementById('tos-input').value.trim();
  
  if (!tosText) {
    alert('Please paste some Terms of Service text first!');
    return;
  }

  document.getElementById('input-section').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  await new Promise(resolve => setTimeout(resolve, 2000));

  const redFlags = detectRedFlags(tosText);
  
  const criticalCount = redFlags.filter(f => f.severity === 'critical').length;
  const concerningCount = redFlags.filter(f => f.severity === 'concerning').length;
  const score = Math.max(0, 100 - (criticalCount * 30 + concerningCount * 15));
  
  displayResults(redFlags.slice(0, 3), score);
}

function detectRedFlags(text) {
  const flags = [];
  const lower = text.toLowerCase();

  if (lower.includes('share') && (lower.includes('third party') || lower.includes('third-party') || lower.includes('partners'))) {
    flags.push({
      summary: "Your data may be shared with third-party companies",
      severity: "critical",
      clause: "We may share your information with third-party partners"
    });
  }

  if (lower.includes('arbitration') || (lower.includes('waive') && lower.includes('class action'))) {
    flags.push({
      summary: "You cannot sue them - disputes go through arbitration",
      severity: "critical",
      clause: "You agree to binding arbitration and waive class action rights"
    });
  }

  if ((lower.includes('license') || lower.includes('grant')) && lower.includes('royalty-free')) {
    flags.push({
      summary: "They can use your content worldwide without paying you",
      severity: "concerning",
      clause: "You grant us a royalty-free, worldwide license to your content"
    });
  }

  if (lower.includes('terminate') && lower.includes('without') && lower.includes('notice')) {
    flags.push({
      summary: "They can delete your account anytime without warning",
      severity: "concerning",
      clause: "We may terminate your account without prior notice"
    });
  }

  if (lower.includes('cookies') || lower.includes('tracking') || lower.includes('advertisers')) {
    flags.push({
      summary: "Your activity is tracked and shared with advertisers",
      severity: "concerning",
      clause: "We use tracking technologies and may share with advertisers"
    });
  }

  if (lower.includes('as is') || lower.includes('no warranty')) {
    flags.push({
      summary: "No guarantees if the service doesn't work properly",
      severity: "caution",
      clause: "Services provided 'as is' without warranties"
    });
  }

  if (lower.includes('modify') && lower.includes('terms') && lower.includes('any time')) {
    flags.push({
      summary: "They can change these terms whenever they want",
      severity: "caution",
      clause: "We reserve the right to modify Terms at any time"
    });
  }

  if (lower.includes('indemnif')) {
    flags.push({
      summary: "You must defend them if they get sued because of you",
      severity: "caution",
      clause: "You will indemnify and hold us harmless from claims"
    });
  }

  while (flags.length < 3) {
    flags.push({
      summary: "Standard legal protections limiting company liability",
      severity: "caution",
      clause: "Additional standard terms and conditions apply"
    });
  }

  return flags;
}

function displayResults(redFlags, score) {
  document.getElementById('score').textContent = score;
  
  document.getElementById('recommendation').textContent = 
    score > 70 ? '✅ Generally Safe' : 
    score > 40 ? '⚠️ Proceed with Caution' : 
    '🚨 High Risk';

  const container = document.getElementById('flags-container');
  container.innerHTML = '';
  
  redFlags.forEach(flag => {
    const div = document.createElement('div');
    div.className = `red-flag ${flag.severity}`;
    div.innerHTML = `
      <div class="flag-title">${flag.severity}</div>
      <div class="flag-desc">${flag.summary}</div>
      <div class="flag-clause">"${flag.clause}"</div>
    `;
    container.appendChild(div);
  });

  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}

function resetForm() {
  document.getElementById('tos-input').value = '';
  document.getElementById('results').style.display = 'none';
  document.getElementById('input-section').style.display = 'block';
}

document.getElementById('scan-btn').addEventListener('click', scanToS);
document.getElementById('new-scan').addEventListener('click', resetForm);

// Auto-detect ToS on current page
document.getElementById('auto-detect-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.id) {
      alert('Cannot access this page. Try opening a website first!');
      return;
    }

    document.getElementById('input-section').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageText
    });

    const pageText = results[0].result;

    if (!pageText || pageText.length < 100) {
      alert('Could not find enough text on this page. Try copy-pasting instead!');
      document.getElementById('input-section').style.display = 'block';
      document.getElementById('loading').style.display = 'none';
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const redFlags = detectRedFlags(pageText);
    
    const criticalCount = redFlags.filter(f => f.severity === 'critical').length;
    const concerningCount = redFlags.filter(f => f.severity === 'concerning').length;
    const score = Math.max(0, 100 - (criticalCount * 30 + concerningCount * 15));
    
    displayResults(redFlags.slice(0, 3), score);

  } catch (error) {
    console.error('Auto-detect error:', error);
    alert('Could not read this page. Try copy-pasting the text instead!');
    document.getElementById('input-section').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  }
});

function extractPageText() {
  const bodyText = document.body.innerText;
  
  const keywords = ['terms of service', 'terms of use', 'user agreement', 'terms and conditions'];
  const lowerText = bodyText.toLowerCase();
  
  for (const keyword of keywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      return bodyText.substring(Math.max(0, index - 500), index + 10000);
    }
  }
  
  return bodyText.substring(0, 15000);
}