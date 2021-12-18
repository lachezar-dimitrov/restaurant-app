using System;

namespace SumSeconds
{
    class Program
    {
        static void Main(string[] args)
        {
			int days, hours, minutes, seconds, finalNumber;

			Console.WriteLine("Enter number of days: ");
			days = Convert.ToInt32(Console.ReadLine()) * 24 * 60 * 60;

			Console.WriteLine("Enter hours: ");
			hours = Convert.ToInt32(Console.ReadLine()) * 60 * 60;

			Console.WriteLine("Enter minutes: ");
			minutes = Convert.ToInt32(Console.ReadLine()) * 60;

			Console.WriteLine("Enter seconds: ");
			seconds = Convert.ToInt32(Console.ReadLine());
			

			Console.WriteLine();

			finalNumber = days + hours + minutes + seconds;

			string finalNumberString = finalNumber.ToString();

			int finalNumberLength = finalNumberString.Length;

			string formatedNumber = "";

			int counter = 0;

			for (int index = finalNumberLength - 1; index >= 0; index--)
            {
                
				
				if (counter % 3 == 0)
                {
					formatedNumber = formatedNumber + " " + finalNumberString[index];
                }
				else
                {
					formatedNumber += finalNumberString[index];

				}

				counter++;

			}

			char[] array = formatedNumber.ToCharArray();
			Array.Reverse(array);

			formatedNumber = new string(array);

			Console.WriteLine(formatedNumber);


			Console.WriteLine(String.Format("{0:### ### ###}", finalNumber));

			Console.ReadLine();
		}
    }
}