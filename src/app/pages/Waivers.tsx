import { useState } from 'react';
import { FileText, Send, CheckCircle } from 'lucide-react';

export function Waivers() {
  const [submitted, setSubmitted] = useState(false);
  
  // Liability Waiver Form State
  const [liabilityForm, setLiabilityForm] = useState({
    childName: '',
    age: '',
    parentName: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    photoVideoConsent: '',
    signature: '',
    date: '',
  });

  // Medical Form State
  const [medicalForm, setMedicalForm] = useState({
    childName: '',
    age: '',
    parentName: '',
    phoneNumber: '',
    email: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
    emergencyInstructions: '',
    doctorName: '',
    clinic: '',
    doctorPhone: '',
    signature: '',
    date: '',
  });

  const handleLiabilityChange = (field: string, value: string) => {
    setLiabilityForm({ ...liabilityForm, [field]: value });
  };

  const handleMedicalChange = (field: string, value: string) => {
    setMedicalForm({ ...medicalForm, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body with all form data
    const emailBody = `
AAA SPORTS CAMP - WAIVER SUBMISSION

=== LIABILITY & CONSENT WAIVER ===

1. PARTICIPANT INFORMATION
Child's Name: ${liabilityForm.childName}
Age: ${liabilityForm.age}
Parent/Guardian Name: ${liabilityForm.parentName}
Phone Number: ${liabilityForm.phoneNumber}
Emergency Contact: ${liabilityForm.emergencyContact}
Emergency Contact Phone: ${liabilityForm.emergencyPhone}

2. ACKNOWLEDGMENT OF RISK
Parent acknowledges understanding of risks associated with soccer activities.

3. LIABILITY RELEASE
Parent releases AAA Sports Camp from liability for injuries or accidents.

4. MEDICAL CONSENT
Parent authorizes basic first aid and emergency services if needed.

5. BEHAVIOR & PARTICIPATION
Parent acknowledges behavior expectations and removal policy.

6. PHOTO/VIDEO RELEASE
Permission to use photos/videos: ${liabilityForm.photoVideoConsent}

7. SIGNATURE
Signature: ${liabilityForm.signature}
Date: ${liabilityForm.date}

=== MEDICAL INFORMATION FORM ===

1. PARTICIPANT INFORMATION
Child's Name: ${medicalForm.childName}
Age: ${medicalForm.age}
Parent/Guardian Name: ${medicalForm.parentName}
Phone Number: ${medicalForm.phoneNumber}
Email: ${medicalForm.email}

2. MEDICAL CONDITIONS
${medicalForm.medicalConditions || 'None reported'}

3. ALLERGIES
${medicalForm.allergies || 'None reported'}

4. MEDICATIONS
${medicalForm.medications || 'None reported'}

5. EMERGENCY INSTRUCTIONS
${medicalForm.emergencyInstructions || 'None provided'}

6. PHYSICIAN INFORMATION
Doctor's Name: ${medicalForm.doctorName || 'Not provided'}
Clinic/Practice: ${medicalForm.clinic || 'Not provided'}
Phone Number: ${medicalForm.doctorPhone || 'Not provided'}

7. AUTHORIZATION
Signature: ${medicalForm.signature}
Date: ${medicalForm.date}

---
Submitted on: ${new Date().toLocaleString()}
    `.trim();

    // Create mailto link
    const subject = encodeURIComponent(`AAA Sports Camp - Waiver Submission for ${liabilityForm.childName}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:aaasportscamp@example.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-[#43A047]" size={48} />
            </div>
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
              Forms Submitted Successfully!
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-4">
              Your email client should have opened with the waiver information. Please send the email to complete your submission.
            </p>
            <p className="font-inter text-gray-600 mb-8">
              If the email didn't open automatically, please email your information to: <strong>aaasportscamp@example.com</strong>
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Online Waiver Submission
          </h1>
          <p className="font-inter text-lg text-gray-600">
            Complete both forms below and submit online
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Liability Waiver */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#E53935] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="text-[#E53935]" size={24} />
              </div>
              <div>
                <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
                  AAA Sports Camp – Liability & Consent Waiver
                </h2>
                <div className="font-inter text-gray-600 space-y-1">
                  <p><strong>Summer Soccer Program (Ages 7–10)</strong></p>
                  <p><strong>Location:</strong> Eastlake High School, Sammamish, WA</p>
                  <p><strong>Schedule:</strong> Wednesdays & Saturdays, 10:00 AM – 12:00 PM</p>
                  <p><strong>Dates (Info):</strong> Wed — July 1, 8, 15, 22, 29; Aug 5, 12 | Sat — July 4, 11, 18, 25; Aug 1, 8, 15</p>
                  <p><strong>Coaches:</strong> Local high‑school athletes</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Section 1: Participant Information */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  1. Participant Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Child's Name *</label>
                    <input
                      type="text"
                      required
                      value={liabilityForm.childName}
                      onChange={(e) => handleLiabilityChange('childName', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      required
                      min="6"
                      max="12"
                      value={liabilityForm.age}
                      onChange={(e) => handleLiabilityChange('age', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Parent/Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={liabilityForm.parentName}
                      onChange={(e) => handleLiabilityChange('parentName', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={liabilityForm.phoneNumber}
                      onChange={(e) => handleLiabilityChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Emergency Contact (if different)</label>
                    <input
                      type="text"
                      value={liabilityForm.emergencyContact}
                      onChange={(e) => handleLiabilityChange('emergencyContact', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      value={liabilityForm.emergencyPhone}
                      onChange={(e) => handleLiabilityChange('emergencyPhone', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Acknowledgment of Risk */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  2. Acknowledgment of Risk
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  I understand that soccer is a physical activity that may involve running, jumping, kicking, and contact 
                  with other players. I acknowledge that participation in AAA Sports Camp may include risks such as minor 
                  injuries (scrapes, bruises, sprains) and, although unlikely, more serious injuries. I voluntarily allow 
                  my child to participate and accept these risks.
                </p>
              </div>

              {/* Section 3: Liability Release */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  3. Liability Release
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  By signing below, I agree that AAA Sports Camp, its organizers, coaches (including high‑school volunteers), 
                  and Eastlake High School are not responsible for any injuries, accidents, or property loss that may occur 
                  during camp hours. I release AAA Sports Camp and all associated parties from any liability related to my 
                  child's participation.
                </p>
              </div>

              {/* Section 4: Medical Consent */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  4. Medical Consent
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  In the event of an injury or emergency, I authorize AAA Sports Camp staff to provide basic first aid, 
                  contact emergency services if needed, and make reasonable decisions while attempting to reach me. I 
                  understand that I am responsible for any medical expenses that may result.
                </p>
              </div>

              {/* Section 5: Behavior & Participation */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  5. Behavior & Participation
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  I understand that my child is expected to follow instructions and behave respectfully. Unsafe or disruptive 
                  behavior may result in removal from the activity. Refunds are not guaranteed if a child is removed for 
                  behavior reasons.
                </p>
              </div>

              {/* Section 6: Photo/Video Release */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  6. Photo/Video Release *
                </h3>
                <p className="font-inter text-gray-700 mb-4">
                  Do you give permission for AAA Sports Camp to use photos or videos of your child for promotion?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="photoVideoConsent"
                      value="YES"
                      required
                      checked={liabilityForm.photoVideoConsent === 'YES'}
                      onChange={(e) => handleLiabilityChange('photoVideoConsent', e.target.value)}
                      className="w-5 h-5 text-[#E53935]"
                    />
                    <span className="font-inter text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="photoVideoConsent"
                      value="NO"
                      required
                      checked={liabilityForm.photoVideoConsent === 'NO'}
                      onChange={(e) => handleLiabilityChange('photoVideoConsent', e.target.value)}
                      className="w-5 h-5 text-[#E53935]"
                    />
                    <span className="font-inter text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Section 7: Signature */}
              <div className="pt-4 border-t-2 border-gray-200">
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  7. Parent/Guardian Signature *
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">
                      Type your full name to sign *
                    </label>
                    <input
                      type="text"
                      required
                      value={liabilityForm.signature}
                      onChange={(e) => handleLiabilityChange('signature', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={liabilityForm.date}
                      onChange={(e) => handleLiabilityChange('date', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E53935] focus:outline-none font-inter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information Form */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="text-[#43A047]" size={24} />
              </div>
              <div>
                <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
                  AAA Sports Camp – Medical Information Form
                </h2>
                <div className="font-inter text-gray-600 space-y-1">
                  <p><strong>Summer Soccer Program (Ages 7–10)</strong></p>
                  <p>Eastlake High School – Sammamish, WA</p>
                  <p>Wednesdays & Saturdays – 10:00 AM – 12:00 PM</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Section 1: Participant Information */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  1. Participant Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Child's Name *</label>
                    <input
                      type="text"
                      required
                      value={medicalForm.childName}
                      onChange={(e) => handleMedicalChange('childName', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      required
                      min="6"
                      max="12"
                      value={medicalForm.age}
                      onChange={(e) => handleMedicalChange('age', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Parent/Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={medicalForm.parentName}
                      onChange={(e) => handleMedicalChange('parentName', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={medicalForm.phoneNumber}
                      onChange={(e) => handleMedicalChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Email (optional)</label>
                    <input
                      type="email"
                      value={medicalForm.email}
                      onChange={(e) => handleMedicalChange('email', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Medical Conditions */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  2. Medical Conditions
                </h3>
                <label className="block font-inter text-gray-700 mb-2">
                  Does your child have any medical conditions we should be aware of? (e.g., asthma, diabetes, seizures, etc.)
                </label>
                <textarea
                  value={medicalForm.medicalConditions}
                  onChange={(e) => handleMedicalChange('medicalConditions', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                  placeholder="Please list any medical conditions or write 'None'"
                />
              </div>

              {/* Section 3: Allergies */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  3. Allergies
                </h3>
                <label className="block font-inter text-gray-700 mb-2">
                  Does your child have any allergies? (food, medications, insect stings, environmental, etc.)
                </label>
                <textarea
                  value={medicalForm.allergies}
                  onChange={(e) => handleMedicalChange('allergies', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                  placeholder="Please list any allergies or write 'None'"
                />
              </div>

              {/* Section 4: Medications */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  4. Medications
                </h3>
                <label className="block font-inter text-gray-700 mb-2">
                  Is your child currently taking any medications? If yes, please list the medication name, dosage, and when it should be taken:
                </label>
                <textarea
                  value={medicalForm.medications}
                  onChange={(e) => handleMedicalChange('medications', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                  placeholder="Please list medications or write 'None'"
                />
              </div>

              {/* Section 5: Emergency Instructions */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  5. Emergency Instructions
                </h3>
                <label className="block font-inter text-gray-700 mb-2">
                  Are there any specific instructions we should follow in case of a medical emergency involving your child?
                </label>
                <textarea
                  value={medicalForm.emergencyInstructions}
                  onChange={(e) => handleMedicalChange('emergencyInstructions', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                  placeholder="Please provide any emergency instructions"
                />
              </div>

              {/* Section 6: Physician Information */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  6. Physician Information (Optional)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Doctor's Name</label>
                    <input
                      type="text"
                      value={medicalForm.doctorName}
                      onChange={(e) => handleMedicalChange('doctorName', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Clinic/Practice</label>
                    <input
                      type="text"
                      value={medicalForm.clinic}
                      onChange={(e) => handleMedicalChange('clinic', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={medicalForm.doctorPhone}
                      onChange={(e) => handleMedicalChange('doctorPhone', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                </div>
              </div>

              {/* Section 7: Authorization */}
              <div className="pt-4 border-t-2 border-gray-200">
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                  7. Parent/Guardian Authorization *
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed mb-6">
                  I confirm that the information provided above is accurate. I authorize AAA Sports Camp staff to follow 
                  the instructions listed and to contact emergency services if needed.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">
                      Type your full name to sign *
                    </label>
                    <input
                      type="text"
                      required
                      value={medicalForm.signature}
                      onChange={(e) => handleMedicalChange('signature', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={medicalForm.date}
                      onChange={(e) => handleMedicalChange('date', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#43A047] focus:outline-none font-inter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="flex items-center gap-3 mx-auto px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
            >
              <Send size={20} />
              Submit Forms via Email
            </button>
            <p className="font-inter text-sm text-gray-500 mt-4">
              * Required fields
            </p>
          </div>
        </form>

        {/* Important Note */}
        <div className="mt-8 bg-blue-50 border-l-4 border-[#1E88E5] p-6 rounded-lg">
          <h3 className="font-poppins font-semibold text-gray-900 mb-2">Important:</h3>
          <ul className="font-inter text-gray-700 space-y-2 list-disc list-inside">
            <li>Complete all required fields marked with *</li>
            <li>Review all information carefully before submitting</li>
            <li>After clicking submit, your email client will open with the form data</li>
            <li>Send the email to complete your waiver submission</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
