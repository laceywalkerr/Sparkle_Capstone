﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sparkle_Capstone.Models.ViewModels
{
    public class ReviewSummary
    {
        public int Id { get; set; }
        public string ImageLocation { get; set; }
        public string NameOfProduct { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public string DisplayName { get; set; }

        public DateTime? PublishDateTime { get; set; }

        public Category Category { get; set; }
        public int Rating { get; set; }
    }
}