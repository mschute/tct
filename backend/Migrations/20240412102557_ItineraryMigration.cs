using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ItineraryMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "ItineraryLocations",
                newName: "StopOver");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Bookings",
                newName: "TripStartTime");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Itineraries",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "TripEndTime",
                table: "Itineraries",
                type: "TEXT",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "TripStartTime",
                table: "Itineraries",
                type: "TEXT",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<DateOnly>(
                name: "TripDate",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "TripEndTime",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<int>(
                name: "StopOver",
                table: "BookingLocations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Itineraries_CustomerId",
                table: "Itineraries",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Itineraries_Customers_CustomerId",
                table: "Itineraries",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Itineraries_Customers_CustomerId",
                table: "Itineraries");

            migrationBuilder.DropIndex(
                name: "IX_Itineraries_CustomerId",
                table: "Itineraries");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Itineraries");

            migrationBuilder.DropColumn(
                name: "TripEndTime",
                table: "Itineraries");

            migrationBuilder.DropColumn(
                name: "TripStartTime",
                table: "Itineraries");

            migrationBuilder.DropColumn(
                name: "TripDate",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "TripEndTime",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StopOver",
                table: "BookingLocations");

            migrationBuilder.RenameColumn(
                name: "StopOver",
                table: "ItineraryLocations",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "TripStartTime",
                table: "Bookings",
                newName: "Date");
        }
    }
}
