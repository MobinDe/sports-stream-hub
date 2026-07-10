import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(3, 'نام باید حداقل ۳ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  subject: z.string().min(3, 'موضوع باید حداقل ۳ کاراکتر باشد'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_formData: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // شبیه‌سازی درخواست به سرور
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // استفاده از _formData برای رفع خطای ESLint (در آینده می‌توانید درخواست واقعی بزنید)
      console.log('Form data received:', _formData);

      setSubmitStatus({
        type: 'success',
        message: 'پیام شما با موفقیت ارسال شد. از تماس شما سپاسگزاریم!',
      });
      reset();
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        تماس با ما
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        ما همواره خوشحالیم از شنیدن نظرات، پیشنهادات و انتقادات شما.
        لطفاً فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* فرم تماس */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ارسال پیام</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                {...register('name')}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="مثال: علی محمدی"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">ایمیل</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="example@domain.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">موضوع</label>
              <input
                type="text"
                {...register('subject')}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="مثال: انتقاد، پیشنهاد، مشکل فنی"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">پیام شما</label>
              <textarea
                rows={5}
                {...register('message')}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="پیام خود را بنویسید..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
            </button>

            {submitStatus.type && (
              <div
                className={`p-3 rounded-xl text-center ${
                  submitStatus.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>

        {/* اطلاعات تماس و نقشه */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">اطلاعات تماس</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-orange-500 text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">آدرس</p>
                  <p className="text-gray-600">
                    تهران، خیابان ورزش، پلاک ۱۲، طبقه سوم
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 text-xl">📞</span>
                <div>
                  <p className="font-semibold text-gray-800">تلفن تماس</p>
                  <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  <p className="text-gray-600">۰۲۱-۸۷۶۵۴۳۲۱</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 text-xl">✉️</span>
                <div>
                  <p className="font-semibold text-gray-800">ایمیل</p>
                  <p className="text-gray-600">info@sportsplus.ir</p>
                  <p className="text-gray-600">support@sportsplus.ir</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 text-xl">🕒</span>
                <div>
                  <p className="font-semibold text-gray-800">ساعات کاری</p>
                  <p className="text-gray-600">شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر</p>
                  <p className="text-gray-600">پنجشنبه: ۹ صبح تا ۱ بعدازظهر</p>
                </div>
              </div>
            </div>
          </div>

          {/* نقشه */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.917484489297!2d51.389015!3d35.689197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0146f4d5e0c5%3A0x8b3c1c5d8e5f4b1f!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>

      {/* شبکه‌های اجتماعی */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 mb-3">ما را در شبکه‌های اجتماعی دنبال کنید</p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="bg-gray-100 p-2 rounded-full hover:bg-orange-500 transition"
          >
            <svg
              className="w-6 h-6 text-gray-700 hover:text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </a>
          <a
            href="#"
            className="bg-gray-100 p-2 rounded-full hover:bg-orange-500 transition"
          >
            <svg
              className="w-6 h-6 text-gray-700 hover:text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.55 0 .36.04.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.28 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.38.1-.78.16-1.2.16-.3 0-.58-.03-.87-.08.59 1.84 2.3 3.18 4.32 3.22-1.58 1.24-3.57 1.98-5.74 1.98-.37 0-.74-.02-1.1-.06 2.03 1.3 4.44 2.06 7.04 2.06 8.44 0 13.06-7 13.06-13.06 0-.2 0-.4-.02-.6.9-.63 1.68-1.42 2.3-2.32z" />
            </svg>
          </a>
          <a
            href="#"
            className="bg-gray-100 p-2 rounded-full hover:bg-orange-500 transition"
          >
            <svg
              className="w-6 h-6 text-gray-700 hover:text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.16c-5.5 0-10 4.5-10 10 0 4.67 3.18 8.63 7.5 9.8.55.1.75-.24.75-.53 0-.26-.01-.96-.01-1.88-3.07.67-3.72-1.48-3.72-1.48-.5-1.27-1.23-1.61-1.23-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.72.38-1.2.7-1.48-2.44-.28-5-1.22-5-5.42 0-1.2.43-2.18 1.13-2.95-.1-.28-.5-1.4.1-2.92 0 0 .92-.3 3 1.12.87-.24 1.8-.36 2.73-.37.93.01 1.86.13 2.73.37 2.08-1.42 3-1.12 3-1.12.6 1.52.2 2.64.1 2.92.7.77 1.13 1.75 1.13 2.95 0 4.2-2.56 5.14-5 5.42.38.33.72.98.72 1.98 0 1.43-.02 2.58-.02 2.93 0 .29.2.63.75.52 4.32-1.17 7.5-5.13 7.5-9.8 0-5.5-4.5-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;