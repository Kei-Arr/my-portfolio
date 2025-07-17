export const createEmailTemplate = (
  name: string,
  email: string,
  message: string
): string => {
  const currentDate = new Date().toLocaleString();
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #8B1538; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">📧You Got An Inquiry!</h2>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2196f3;">
          <h3 style="margin: 0 0 10px 0; color: #1976d2;">👤 Sender Information</h3>
          <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1976d2;">${email}</a></p>
          <p style="margin: 0; font-size: 12px; color: #666;">💡 You can reply directly to this email to respond to ${name}</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B1538;">
          <h3 style="margin: 0 0 15px 0; color: #8B1538;">💬 Message</h3>
          <div style="line-height: 1.6; color: #333;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
        <p style="color: #666; font-size: 12px; margin: 0;">
          🕒 Received: ${currentDate}
        </p>
      </div>
    </div>
  `;
};

export const createErrorEmailTemplate = (
  error: string,
  timestamp: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #d32f2f; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">🚨 Contact Form Error</h2>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
        <div style="background-color: #ffebee; padding: 15px; border-radius: 8px; border-left: 4px solid #f44336;">
          <h3 style="margin: 0 0 10px 0; color: #c62828;">Error Details</h3>
          <p style="margin: 0 0 8px 0;"><strong>Error:</strong> ${error}</p>
          <p style="margin: 0 0 8px 0;"><strong>Timestamp:</strong> ${timestamp}</p>
        </div>
      </div>
    </div>
  `;
};